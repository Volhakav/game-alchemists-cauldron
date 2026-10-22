import { gameStore } from '../state/game-state';
import { INGREDIENT_IMAGES } from '../data/icons';

const MAX_INGREDIENTS = 4;

function buildCauldron(container: HTMLElement): void {
  container.innerHTML = `
    <div class="cauldron-panel">
      <h2>Alchemist's Cauldron</h2>
      <div class="cauldron-counter">Ingredients: 0 / ${MAX_INGREDIENTS}</div>
      <div class="cauldron-list">
        <p class="empty-text">Drop ingredients here...</p>
      </div>
    </div>
  `;
}

export function renderCauldron(container: HTMLElement): void {
  if (!container.querySelector('.cauldron-panel')) {
    buildCauldron(container);
  }

  const state = gameStore.getState();
  const currentCount = state.cauldronIngredients.length;

  const counter = container.querySelector('.cauldron-counter');
  const countText = `Ingredients: ${currentCount} / ${MAX_INGREDIENTS}`;
  if (counter && counter.textContent !== countText) {
    counter.textContent = countText;
  }

  const list = container.querySelector('.cauldron-list');
  if (list) {
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

    if (list.innerHTML !== itemsHtml) {
      list.innerHTML = itemsHtml;
    }
  }
}
