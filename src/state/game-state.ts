import { IGameState, IIngredient, IRecipe } from '../data/types';
import { INGREDIENTS } from '../data/ingredients';
import { generateInitialStock } from '../logic/stock';

const dummyRecipe: IRecipe = {
  id: 'temp',
  name: 'Trial Potion',
  difficulty: 'medium',
  temperature: { min: 20, max: 50 },
  density: { min: 10, max: 30 },
  magicPower: { min: 15, max: 40 },
};

class GameStore {
  private state: IGameState = {
    status: 'playing',
    score: 0,
    timeLeft: 150,
    lives: 3,
    activeRecipe: dummyRecipe,
    cauldronIngredients: [],
    shelfStock: generateInitialStock(6),
    difficulty: 'medium',
  };

  private listeners: Array<(state: IGameState) => void> = [];

  public getState(): IGameState {
    return this.state;
  }

  public subscribe(listener: (state: IGameState) => void): void {
    this.listeners.push(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  public addIngredientToCauldron(ingredientId: string): boolean {
    if (this.state.cauldronIngredients.length >= 4) {
      return false;
    }

    const currentStock = this.state.shelfStock[ingredientId] ?? 0;
    if (currentStock <= 0) {
      return false;
    }

    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId);
    if (!ingredient) {
      return false;
    }

    this.state.shelfStock[ingredientId] = currentStock - 1;
    this.state.cauldronIngredients.push(ingredient);

    this.notify();
    return true;
  }
}

export const gameStore = new GameStore();