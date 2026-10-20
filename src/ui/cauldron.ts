import { gameStore } from '../state/game-state';

export function renderCauldron(container: HTMLElement): void {
  const state = gameStore.getState();
  const maxIngredients = 4;
  const currentCount = state.cauldronIngredients.length;

  container.innerHTML = `
    <div class="cauldron-panel">
      <h2>Alchemist's Cauldron</h2>
      <div class="cauldron-counter">Ingredients: ${currentCount} / ${maxIngredients}</div>
      <div class="cauldron-list">
        ${
          currentCount === 0
            ? '<p class="empty-text">Drop ingredients here...</p>'
            : state.cauldronIngredients
                .map(
                  (ing, index) => `
              <div class="cauldron-item" data-index="\${index}">
                <span class="icon">\${ing.icon}</span>
                <span class="name">\${ing.name}</span>
              </div>
            `
                )
                .join('')
        }
      </div>
    </div>
  `;
}