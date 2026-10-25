import { IGameState, IRecipe, Difficulty } from '../data/types';
import { INGREDIENTS } from '../data/ingredients';
import { getRecipesByDifficulty } from '../data/recipes';
import { generateInitialStock } from '../logic/stock';
import { calculateCauldron } from '../logic/calculate-cauldron';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';
import { REACTIONS } from '../data/reactions';
import { saveGame, loadGame, clearSave } from '../storage/save';

function pickRandomRecipe(difficulty: Difficulty): IRecipe {
  const available = getRecipesByDifficulty(difficulty);
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

class GameStore {
  private state: IGameState & { gameOverReason?: string } = {
    status: 'menu',
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
  private leaderboardFrom: 'menu' | 'game-over' = 'menu';
  private scoreSubmitted: boolean = false;

  constructor() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state.status === 'playing') {
        this.pauseGame();
      }
    });
  }

  public getState() {
    return this.state;
  }

  public subscribe(listener: (state: IGameState) => void): void {
    this.listeners.push(listener);
  }

  private notify(): void {
    saveGame(this.state);
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

  public startGame(difficulty: Difficulty = 'medium') {
    clearSave();
    this.scoreSubmitted = false;
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const activeIngredients = INGREDIENTS.slice(0, settings.shelfIngredientsCount);

    this.state = {
      status: 'playing',
      score: 0,
      timeLeft: settings.startTime,
      lives: settings.lives,
      difficulty: difficulty,
      activeRecipe: pickRandomRecipe(difficulty),
      cauldronIngredients: [],
      shelfStock: generateInitialStock(activeIngredients.length),
      gameOverReason: undefined,
    };
    this.startTimer();
    this.notify();
  }

  public continueGame(): boolean {
    const savedState = loadGame();
    if (!savedState) return false;

    this.scoreSubmitted = false;
    this.state = {
      ...savedState,
      status: 'paused',
    };

    this.notify();
    return true;
  }

  public resetGame() {
    this.startGame(this.state.difficulty || 'medium');
  }

  public openLeaderboard(from: 'menu' | 'game-over' = 'menu') {
    this.leaderboardFrom = from;
    this.state.status = 'leaderboard';
    this.notify();
  }

  public closeLeaderboard() {
    this.state.status = this.leaderboardFrom;
    this.notify();
  }

  public isScoreSubmitted(): boolean {
    return this.scoreSubmitted;
  }

  public markScoreSubmitted(): void {
    this.scoreSubmitted = true;
    this.notify();
  }

  public pauseGame() {
    if (this.state.status === 'playing') {
      this.state.status = 'paused';
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.notify();
    }
  }

  public resumeGame() {
    if (this.state.status === 'paused') {
      this.state.status = 'playing';
      this.endTime = Date.now() + this.state.timeLeft * 1000;
      this.startTimer();
      this.notify();
    }
  }

  public exitToMenu() {
    clearSave();
    this.state.status = 'menu';
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.notify();
  }

  public endGame(reason: string) {
    clearSave();
    this.state.status = 'game-over';
    this.state.gameOverReason = reason;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.notify();
  }

  public addIngredientToCauldron(ingredientId: string): boolean {
    if (this.state.status !== 'playing') return false;
    const currentDifficulty = this.state.difficulty || 'medium';
    const settings = DIFFICULTY_SETTINGS[currentDifficulty];
    if (this.state.cauldronIngredients.length >= settings.maxCauldronIngredients) return false;

    const currentStock = this.state.shelfStock[ingredientId] ?? 0;
    if (currentStock <= 0) return false;

    const activeIngredients = INGREDIENTS.slice(0, settings.shelfIngredientsCount);
    const ingredient = activeIngredients.find((i) => i.id === ingredientId);
    if (!ingredient) return false;

    const before = [...this.state.cauldronIngredients];
    const beforeStats = calculateCauldron(before, currentDifficulty);

    const after = [...before, ingredient];
    const afterStats = calculateCauldron(after, currentDifficulty);

    const enabledReactions = REACTIONS.slice(0, settings.reactionsCount);

    const firedNow = enabledReactions.filter((reaction) => {
      const wasActive = reaction.isActive(before, beforeStats);
      const isActiveNow = reaction.isActive(after, afterStats);
      return !wasActive && isActiveNow;
    });

    this.state.shelfStock[ingredientId] = currentStock - 1;
    this.state.cauldronIngredients = after;

    for (const reaction of firedNow) {
      reaction.apply(afterStats, this.state);
    }

    if (this.state.lives <= 0) {
      this.endGame('Out of lives!');
      return true;
    }

    this.notify();
    return true;
  }

  public pourOut(): boolean {
    if (this.state.status !== 'playing') return false;
    if (this.state.cauldronIngredients.length === 0) return false;

    this.state.cauldronIngredients = [];
    this.state.timeLeft = Math.max(0, this.state.timeLeft - 10);
    this.endTime = Date.now() + this.state.timeLeft * 1000;

    this.notify();
    return true;
  }

  public brew(): boolean {
    if (this.state.status !== 'playing') return false;
    if (this.state.cauldronIngredients.length === 0) return false;

    const diff = this.state.difficulty || 'medium';
    const settings = DIFFICULTY_SETTINGS[diff];

    const totals = calculateCauldron(this.state.cauldronIngredients, diff);
    const recipe = this.state.activeRecipe;
    const tolerance = settings.tolerance;

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

    (this.state as any).lastBrewResult = isSuccess ? 'success' : 'failure';

    if (isSuccess) {
      this.state.score += settings.scorePerBrew;
      this.state.timeLeft = Math.min(settings.startTime, this.state.timeLeft + settings.timeBonusPerBrew);
      this.endTime = Date.now() + this.state.timeLeft * 1000;
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