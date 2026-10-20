import { INGREDIENTS } from '../data/ingredients';
import { gameStore } from '../state/game-state';

export function renderShelf(container: HTMLElement): void {
  const state = gameStore.getState();
  const activeIngredients = INGREDIENTS.slice(0, 6);
  const isCauldronFull = state.cauldronIngredients.length >= 4;

  let cardsHtml = '';

  activeIngredients.forEach((ing) => {
    const stock = state.shelfStock[ing.id] ?? 0;
    const isEmpty = stock <= 0;
    const isDisabled = isEmpty || isCauldronFull;
    const iconDisplay = isEmpty ? '' : ing.icon;

    cardsHtml += `
      <button class="ingredient-card ${isEmpty ? 'empty' : ''} ${isDisabled ? 'disabled' : ''}" 
              data-id="${ing.id}" 
              ${isDisabled ? 'disabled' : ''}>
        <span class="icon">${iconDisplay}</span>
        <div class="info">
          <span class="name">${ing.name}</span>
          <span class="stats">T${ing.temperature} D${ing.density} M${ing.magicPower}</span>
        </div>
        <span class="badge">${stock}</span>
      </button>
    `;
  });

  container.innerHTML = `
    <div class="shelf-panel">
      <h3>Ingredients</h3>
      <div class="shelf-cards">
        ${cardsHtml}
      </div>
    </div>
  `;

  container.querySelectorAll('.ingredient-card:not([disabled])').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) {
        gameStore.addIngredientToCauldron(id);
      }
    });
  });
}