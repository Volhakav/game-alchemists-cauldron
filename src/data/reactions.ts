import { IIngredient } from './types';

export interface CauldronStats {
  temperature: number;
  density: number;
  magicPower: number;
}

export interface IReaction {
  id: string;
  name: string;
  type: 'ingredients' | 'stats' | 'mix';
  isActive(ingredients: IIngredient[], stats: CauldronStats): boolean;
  apply(stats: CauldronStats, gameState: any): CauldronStats;
}

const hasIng = (list: IIngredient[], id: string): boolean => list.some((i) => i.id === id);

export const REACTIONS: IReaction[] = [
  {
    id: 'bubbling',
    name: 'Bubbling',
    type: 'ingredients',
    isActive: (ing) => hasIng(ing, 'fairy-dust') && hasIng(ing, 'caustic-acid'),
    apply: (stats, gameState) => {
      stats.magicPower += Math.round(stats.magicPower * 0.5);
      if (gameState) gameState.timeLeft = Math.max(0, gameState.timeLeft - 10);
      return stats;
    },
  },
  {
    id: 'volatile-mix',
    name: 'Volatile Mix',
    type: 'ingredients',
    isActive: (ing) => hasIng(ing, 'phoenix-feather') && hasIng(ing, 'essence-of-the-void'),
    apply: (stats, gameState) => {
      if (gameState) {
        gameState.lives = Math.max(0, gameState.lives - 1);
        gameState.cauldronIngredients = [];
      }
      return stats;
    },
  },
  {
    id: 'solar-frost',
    name: 'Solar Frost',
    type: 'ingredients',
    isActive: (ing) => hasIng(ing, 'dragon-tears') && hasIng(ing, 'frost-lotus'),
    apply: (stats) => {
      stats.temperature = 0;
      stats.density += Math.round(stats.density * 0.2);
      return stats;
    },
  },
  {
    id: 'rooted-steam',
    name: 'Rooted Steam',
    type: 'ingredients',
    isActive: (ing) => hasIng(ing, 'mandrake-root') && hasIng(ing, 'toad-slime'),
    apply: (stats) => {
      stats.density += Math.round(stats.density * 0.25);
      stats.magicPower -= Math.round(stats.magicPower * 0.1);
      return stats;
    },
  },
  {
    id: 'ashen-bloom',
    name: 'Ashen Bloom',
    type: 'ingredients',
    isActive: (ing) => hasIng(ing, 'phoenix-feather') && hasIng(ing, 'fairy-dust'),
    apply: (stats) => {
      stats.temperature += 10;
      stats.magicPower += Math.round(stats.magicPower * 0.25);
      return stats;
    },
  },
  {
    id: 'annihilation',
    name: 'Annihilation',
    type: 'stats',
    isActive: (ing) => ing.some((i) => i.temperature > 15) && ing.some((i) => i.temperature < -15),
    apply: (stats) => {
      stats.temperature = 0;
      stats.density *= 2;
      return stats;
    },
  },
  {
    id: 'pressure-spike',
    name: 'Pressure Spike',
    type: 'stats',
    isActive: (_, stats) => stats.density >= 70,
    apply: (stats) => {
      stats.density = 70;
      stats.magicPower += Math.round(stats.magicPower * 0.1);
      return stats;
    },
  },
  {
    id: 'magma-flux',
    name: 'Magma Flux',
    type: 'stats',
    isActive: (_, stats) => stats.temperature >= 60,
    apply: (stats) => {
      stats.magicPower += Math.round(stats.magicPower * 0.2);
      stats.density -= Math.round(stats.density * 0.1);
      return stats;
    },
  },
  {
    id: 'deep-freeze',
    name: 'Deep Freeze',
    type: 'stats',
    isActive: (_, stats) => stats.temperature <= -20,
    apply: (stats) => {
      stats.density += Math.round(stats.density * 0.15);
      stats.magicPower -= Math.round(stats.magicPower * 0.15);
      return stats;
    },
  },
  {
    id: 'arcane-saturation',
    name: 'Arcane Saturation',
    type: 'stats',
    isActive: (_, stats) => stats.magicPower >= 80,
    apply: (stats) => {
      stats.magicPower = 80;
      stats.temperature += 5;
      return stats;
    },
  },
  {
    id: 'steam-burst',
    name: 'Steam Burst',
    type: 'mix',
    isActive: (ing, stats) => hasIng(ing, 'dragon-tears') && hasIng(ing, 'caustic-acid') && stats.temperature >= 35,
    apply: (stats, gameState) => {
      stats.temperature += 10;
      if (gameState) gameState.timeLeft = Math.max(0, gameState.timeLeft - 5);
      return stats;
    },
  },
  {
    id: 'black-ice',
    name: 'Black Ice',
    type: 'mix',
    isActive: (ing, stats) => hasIng(ing, 'frost-lotus') && hasIng(ing, 'essence-of-the-void') && stats.density <= 0,
    apply: (stats) => {
      stats.temperature -= 10;
      stats.magicPower += Math.round(stats.magicPower * 0.2);
      return stats;
    },
  },
  {
    id: 'heavy-spark',
    name: 'Heavy Spark',
    type: 'mix',
    isActive: (ing, stats) => hasIng(ing, 'fairy-dust') && hasIng(ing, 'toad-slime') && stats.density >= 40,
    apply: (stats) => {
      stats.density += Math.round(stats.density * 0.2);
      stats.magicPower += Math.round(stats.magicPower * 0.1);
      return stats;
    },
  },
  {
    id: 'burning-root',
    name: 'Burning Root',
    type: 'mix',
    isActive: (ing, stats) => hasIng(ing, 'mandrake-root') && hasIng(ing, 'phoenix-feather') && stats.temperature >= 40,
    apply: (stats) => {
      stats.temperature += 15;
      stats.density -= Math.round(stats.density * 0.1);
      return stats;
    },
  },
  {
    id: 'void-resonance',
    name: 'Void Resonance',
    type: 'mix',
    isActive: (ing, stats) => hasIng(ing, 'essence-of-the-void') && hasIng(ing, 'dragon-tears') && stats.magicPower >= 50,
    apply: (stats) => {
      stats.magicPower += Math.round(stats.magicPower * 0.3);
      stats.temperature -= 5;
      return stats;
    },
  },
];