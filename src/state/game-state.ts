import { IGameState, IRecipe } from '../data/types';
import { INGREDIENTS } from '../data/ingredients';
import { getRecipesByDifficulty } from '../data/recipes';
import { generateInitialStock } from '../logic/stock';
import { calculateCauldron } from '../logic/calculate-cauldron';

function pickRandomRecipe(difficulty: 'easy' | 'medium' | 'hard'): IRecipe {
  const available = getRecipesByDifficulty(difficulty);
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

class GameStore {
  private state: IGameState & { gameOverReason?: string } = {
    status: 'playing',
    score: 0,
    timeLeft: 150,
    lives: 3,
    difficulty: 'medium',
    activeRecipe: pickRandomRecipe('medium'),
    cauldronIngredients: [],
    shelfStock: generateInitialStock(6),
    gameOverReason: undefined,
  };

  private listeners: Array<(state: IGameState) => void> = [];
  private timerInterval: number | null = null;
  private endTime: number = Date.now() + 150 * 1000;

  constructor() {
    this.startTimer();
  }

  public getState() {
    return this.state;
  }

  public subscribe(listener: (state: IGameState) => void): void {
    this.listeners.push(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  private startTimer() {
    this.endTime = Date.now() + this.state.timeLeft * 1000;

    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = window.setInterval(() => {
      if (this.state.status !== 'playing') return;

      const remainingMs = this.endTime - Date.now();
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));
      const hasTimeChanged = this.state.timeLeft !== remainingSecs;
      this.state.timeLeft = remainingSecs;

      if (this.state.timeLeft <= 0) {
        this.endGame("Time's up!");
        return;
      }

      if (this.state.lives <= 0) {
        this.state.gameOverReason = 'Out of lives!';
        this.endGame('Out of lives!');
        return;
      }

      if (this.checkOutOfIngredients()) {
        this.endGame('Out of ingredients!');
        return;
      }

      if (hasTimeChanged) {
        this.notify();
      }
    }, 250);
  }

  private checkOutOfIngredients(): boolean {
    const totalStock = Object.values(this.state.shelfStock).reduce((a, b) => a + b, 0);
    return totalStock === 0 && this.state.cauldronIngredients.length === 0;
  }

  public endGame(reason: string) {
    this.state.status = 'game-over';
    this.state.gameOverReason = reason;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.notify();
  }

  public resetGame() {
    this.state = {
      status: 'playing',
      score: 0,
      timeLeft: 150,
      lives: 3,
      difficulty: 'medium',
      activeRecipe: pickRandomRecipe('medium'),
      cauldronIngredients: [],
      shelfStock: generateInitialStock(6),
      gameOverReason: undefined,
    };
    this.startTimer();
    this.notify();
  }

  public addIngredientToCauldron(ingredientId: string): boolean {
    if (this.state.status !== 'playing') return false;
    if (this.state.cauldronIngredients.length >= 4) return false;

    const currentStock = this.state.shelfStock[ingredientId] ?? 0;
    if (currentStock <= 0) return false;

    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId);
    if (!ingredient) return false;

    this.state.shelfStock[ingredientId] = currentStock - 1;
    this.state.cauldronIngredients.push(ingredient);

    this.notify();
    return true;
  }

  public brew(): boolean {
    if (this.state.status !== 'playing') return false;
    if (this.state.cauldronIngredients.length === 0) return false;

    const totals = calculateCauldron(this.state.cauldronIngredients);
    const recipe = this.state.activeRecipe;
    const tolerance = 8;

    const isTempValid =
      totals.temperature >= recipe.temperature.min - tolerance &&
      totals.temperature <= recipe.temperature.max + tolerance;

    const isDensityValid =
      totals.density >= recipe.density.min - tolerance &&
      totals.density <= recipe.density.max + tolerance;

    const isMagicValid =
      totals.magicPower >= recipe.magicPower.min - tolerance &&
      totals.magicPower <= recipe.magicPower.max + tolerance;

    const isSuccess = isTempValid && isDensityValid && isMagicValid;

    if (isSuccess) {
      this.state.score += 200;
      this.state.timeLeft = Math.min(150, this.state.timeLeft + 10);
      this.endTime = Date.now() + this.state.timeLeft * 1000;

      const diff = this.state.difficulty || 'medium';
      this.state.activeRecipe = pickRandomRecipe(diff);
    } else {
      this.state.lives -= 1;
      if (this.state.lives <= 0) {
        this.endGame('Out of lives!');
      }
    }

    this.state.cauldronIngredients = [];
    this.notify();
    return isSuccess;
  }
}

export const gameStore = new GameStore();
