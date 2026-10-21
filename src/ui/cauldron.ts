import { gameStore } from '../state/game-state';
import { INGREDIENT_IMAGES } from '../data/icons';

export function renderCauldron(container: HTMLElement): void {
  const state = gameStore.getState();
  const maxIngredients = 4;
  const currentCount = state.cauldronIngredients.length;

  let itemsHtml = '';

  if (currentCount === 0) {
    itemsHtml = '<p class="empty-text">Drop ingredients here...</p>';
  } else {
    state.cauldronIngredients.forEach((ing, index) => {
      const imgUrl = INGREDIENT_IMAGES[ing.id] || '';
      itemsHtml += `
        <div class="cauldron-item" data-index="${index}">
          <span class="icon">
            <img src="${imgUrl}" alt="${ing.name}" width="32" height="32" />
          </span>
          <span class="name">${ing.name}</span>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="cauldron-panel">
      <h2>Alchemist's Cauldron</h2>
      <div class="cauldron-counter">Ingredients: ${currentCount} / ${maxIngredients}</div>
      <div class="cauldron-list">
        ${itemsHtml}
      </div>
    </div>
  `;
}