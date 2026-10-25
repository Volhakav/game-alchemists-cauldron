import { IIngredient, Difficulty } from '../data/types';
import { REACTIONS, CauldronStats } from '../data/reactions';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';

export function calculateCauldron(
  ingredients: IIngredient[],
  difficulty: string = 'medium'
): CauldronStats {
  const diff = (difficulty as Difficulty) || 'medium';

  const baseStats: CauldronStats = ingredients.reduce(
    (acc, ing) => ({
      temperature: acc.temperature + ing.temperature,
      density: acc.density + ing.density,
      magicPower: acc.magicPower + ing.magicPower,
    }),
    { temperature: 0, density: 0, magicPower: 0 }
  );

  const settings = DIFFICULTY_SETTINGS[diff] || DIFFICULTY_SETTINGS['medium'];
  const enabledReactions = REACTIONS.slice(0, settings.reactionsCount);

  let currentStats = { ...baseStats };
  for (const reaction of enabledReactions) {
    if (reaction.isActive(ingredients, currentStats)) {
      currentStats = reaction.apply(currentStats, null);
    }
  }

  return currentStats;
}
