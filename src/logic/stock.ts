import { INGREDIENTS } from '../data/ingredients';

export function generateInitialStock(count: number = 6): Record<string, number> {
  const stock: Record<string, number> = {};
  const activeIngredients = INGREDIENTS.slice(0, count);

  activeIngredients.forEach((ingredient) => {
    const randomStock = Math.floor(Math.random() * 14) + 2;
    stock[ingredient.id] = randomStock;
  });

  return stock;
}