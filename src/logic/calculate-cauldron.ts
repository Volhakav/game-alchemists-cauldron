import { IIngredient } from '../data/types';

export interface ICauldronValues {
  temperature: number;
  density: number;
  magicPower: number;
}

export function calculateCauldron(ingredients: IIngredient[]): ICauldronValues {
  return ingredients.reduce(
    (acc, ingredient) => {
      acc.temperature += ingredient.temperature;
      acc.density += ingredient.density;
      acc.magicPower += ingredient.magicPower;
      return acc;
    },
    { temperature: 0, density: 0, magicPower: 0 }
  );
}
