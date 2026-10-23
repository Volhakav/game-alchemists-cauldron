import { Difficulty } from './types';

export interface IDifficultySettings {
  name: Difficulty;
  label: string;
  shelfIngredientsCount: number;
  maxCauldronIngredients: number;
  startTime: number;
  tolerance: number;
  lives: number;
  scorePerBrew: number;
  timeBonusPerBrew: number;
  reactionsCount: number;
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, IDifficultySettings> = {
  easy: {
    name: 'easy',
    label: 'Easy',
    shelfIngredientsCount: 4,
    maxCauldronIngredients: 4,
    startTime: 180,
    tolerance: 12,
    lives: 5,
    scorePerBrew: 100,
    timeBonusPerBrew: 15,
    reactionsCount: 0,
  },
  medium: {
    name: 'medium',
    label: 'Medium',
    shelfIngredientsCount: 6,
    maxCauldronIngredients: 4,
    startTime: 150,
    tolerance: 8,
    lives: 3,
    scorePerBrew: 200,
    timeBonusPerBrew: 10,
    reactionsCount: 2,
  },
  hard: {
    name: 'hard',
    label: 'Hard',
    shelfIngredientsCount: 8,
    maxCauldronIngredients: 5,
    startTime: 150,
    tolerance: 5,
    lives: 3,
    scorePerBrew: 300,
    timeBonusPerBrew: 5,
    reactionsCount: 3,
  },
};