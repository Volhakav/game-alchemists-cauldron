import { gameStore } from '../state/game-state';

const MAX_COUNT = 4;

/** Buduje strukturę panelu tylko raz. */
function buildRecipePanel(container: HTMLElement): void {
  container.innerHTML = `
    <div class="recipe-panel">
      <h3>Current Recipe</h3>
      <h2 class="recipe-title"></h2>

      <div class="recipe-ranges">
        <div class="range-row">
          <span>Temp:</span>
          <strong data-range="temperature"></strong>
        </div>
        <div class="range-row">
          <span>Density:</span>
          <strong data-range="density"></strong>
        </div>
        <div class="range-row">
          <span>Magic:</span>
          <strong data-range="magicPower"></strong>
        </div>
      </div>

      <div class="recipe-counter"></div>

      <button class="brew-btn">Brew Potion</button>
    </div>
  `;

  // Listener podpinany raz - przycisk nie jest już niszczony przy renderze.
  container.querySelector('.brew-btn')!.addEventListener('click', () => {
    gameStore.brew();
  });
}

function setText(el: Element | null, text: string): void {
  if (el && el.textContent !== text) {
    el.textContent = text;
  }
}

export function renderRecipePanel(container: HTMLElement): void {
  if (!container.querySelector('.recipe-panel')) {
    buildRecipePanel(container);
  }

  const state = gameStore.getState();
  const recipe = state.activeRecipe;
  const currentCount = state.cauldronIngredients.length;
  const isMaxReached = currentCount >= MAX_COUNT;
  const canBrew = currentCount > 0;

  // Tytuł i zakresy (zmieniają się, gdy zmieni się aktywny przepis)
  setText(container.querySelector('.recipe-title'), recipe.name);
  setText(
    container.querySelector('[data-range="temperature"]'),
    `${recipe.temperature.min} – ${recipe.temperature.max}`
  );
  setText(
    container.querySelector('[data-range="density"]'),
    `${recipe.density.min} – ${recipe.density.max}`
  );
  setText(
    container.querySelector('[data-range="magicPower"]'),
    `${recipe.magicPower.min} – ${recipe.magicPower.max}`
  );

  // Licznik składników
  const counter = container.querySelector<HTMLElement>('.recipe-counter')!;
  setText(counter, `Ingredients: ${currentCount} / ${MAX_COUNT}`);
  counter.classList.toggle('max-reached', isMaxReached);

  // Przycisk
  const brewBtn = container.querySelector<HTMLButtonElement>('.brew-btn')!;
  if (brewBtn.disabled !== !canBrew) {
    brewBtn.disabled = !canBrew;
  }
}
