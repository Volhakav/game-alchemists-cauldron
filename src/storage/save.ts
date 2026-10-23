import { IGameState } from '../data/types';

const SAVE_KEY = 'alchemists_cauldron_save';

export function isValidSave(data: unknown): data is IGameState {
  if (!data || typeof data !== 'object') return false;
  const s = data as Partial<IGameState>;
  return (
    typeof s.score === 'number' &&
    typeof s.timeLeft === 'number' &&
    typeof s.lives === 'number' &&
    typeof s.difficulty === 'string' &&
    s.activeRecipe !== undefined &&
    Array.isArray(s.cauldronIngredients) &&
    typeof s.shelfStock === 'object' &&
    s.shelfStock !== null &&
    (s.status === 'playing' || s.status === 'paused')
  );
}

export function saveGame(state: IGameState): void {
  try {
    if (state.status === 'playing' || state.status === 'paused') {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } else {
      clearSave();
    }
  } catch (err) {
    console.error('Failed to save game state:', err);
  }
}

export function loadGame(): IGameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    
    if (isValidSave(parsed)) {
      return parsed;
    } else {
      clearSave();
      return null;
    }
  } catch (err) {
    console.error('Failed to load save, clearing corrupted data:', err);
    clearSave();
    return null;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    console.error('Failed to clear save:', err);
  }
}