import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';

const MAX_COUNT = 4;

export default function RecipePanel() {
  const state = useGameStore();
  const recipe = state.activeRecipe;
  const currentCount = state.cauldronIngredients.length;
  const isMaxReached = currentCount >= MAX_COUNT;
  const canBrew = currentCount > 0;

  return (
    <div className="recipe-panel">
      <h3>Current Recipe</h3>
      <h2 className="recipe-title">{recipe.name}</h2>

      <div className="recipe-ranges">
        <div className="range-row">
          <span>Temp:</span>
          <strong data-range="temperature">
            {recipe.temperature.min} – {recipe.temperature.max}
          </strong>
        </div>
        <div className="range-row">
          <span>Density:</span>
          <strong data-range="density">
            {recipe.density.min} – {recipe.density.max}
          </strong>
        </div>
        <div className="range-row">
          <span>Magic:</span>
          <strong data-range="magicPower">
            {recipe.magicPower.min} – {recipe.magicPower.max}
          </strong>
        </div>
      </div>

      <div className={`recipe-counter ${isMaxReached ? 'max-reached' : ''}`}>
        Ingredients: {currentCount} / {MAX_COUNT}
      </div>

      <button className="brew-btn" disabled={!canBrew} onClick={() => gameStore.brew()}>
        Brew Potion
      </button>
    </div>
  );
}