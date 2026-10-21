import { gameStore } from '../state/game-state';

export function renderRecipePanel(container: HTMLElement): void {
  const state = gameStore.getState();
  const recipe = state.activeRecipe;
  const currentCount = state.cauldronIngredients.length;
  const maxCount = 4;
  const isMaxReached = currentCount >= maxCount;
  const canBrew = currentCount > 0;

  container.innerHTML = `
    <div class="recipe-panel">
      <h3>Current Recipe</h3>
      <h2 class="recipe-title">${recipe.name}</h2>
      
      <div class="recipe-ranges">
        <div class="range-row">
          <span>Temp:</span>
          <strong>${recipe.temperature.min} – ${recipe.temperature.max}</strong>
        </div>
        <div class="range-row">
          <span>Density:</span>
          <strong>${recipe.density.min} – ${recipe.density.max}</strong>
        </div>
        <div class="range-row">
          <span>Magic:</span>
          <strong>${recipe.magicPower.min} – ${recipe.magicPower.max}</strong>
        </div>
      </div>

      <div class="recipe-counter ${isMaxReached ? 'max-reached' : ''}">
        Ingredients: ${currentCount} / ${maxCount}
      </div>

      <button class="brew-btn" ${!canBrew ? 'disabled' : ''}>
        Brew Potion
      </button>
    </div>
  `;

  const brewBtn = container.querySelector('.brew-btn');
  if (brewBtn) {
    brewBtn.addEventListener('click', () => {
      gameStore.brew();
    });
  }
}