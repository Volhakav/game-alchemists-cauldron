import { INGREDIENTS } from '../data/ingredients';
import { INGREDIENT_IMAGES } from '../data/icons';
import { gameStore } from '../state/game-state';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';

function buildShelf(container: HTMLElement): void {
  const state = gameStore.getState();
  const settings = DIFFICULTY_SETTINGS[state.difficulty || 'medium'];
  const activeIngredients = INGREDIENTS.slice(0, settings.shelfIngredientsCount);

  const cardsHtml = activeIngredients
    .map((ing) => {
      const imgUrl = INGREDIENT_IMAGES[ing.id] || '';
      
      const t = ing.temperature >= 0 ? `+${ing.temperature}` : `−${Math.abs(ing.temperature)}`;
      const d = ing.density >= 0 ? `+${ing.density}` : `−${Math.abs(ing.density)}`;
      const m = ing.magicPower >= 0 ? `+${ing.magicPower}` : `−${Math.abs(ing.magicPower)}`;

      return `
        <button class="ingredient-card" data-id="${ing.id}" draggable="true">
          <span class="icon">
            ${imgUrl ? `<img src="${imgUrl}" alt="${ing.name}" width="36" height="36" />` : ''}
          </span>
          <div class="info">
            <span class="name">${ing.name}</span>
          </div>
          <span class="badge"></span>
          <div class="ingredient-tooltip">
            <div class="tooltip-row">Temp: ${t}</div>
            <div class="tooltip-row">Density: ${d}</div>
            <div class="tooltip-row">Magic: ${m}</div>
          </div>
        </button>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="shelf-panel">
      <h3>Ingredients</h3>
      <div class="shelf-cards">
        ${cardsHtml}
      </div>
    </div>
  `;

  const shelfCardsContainer = container.querySelector('.shelf-cards');
  if (shelfCardsContainer) {
    shelfCardsContainer.addEventListener('dragstart', (e: Event) => {
      const dragEvent = e as DragEvent;
      const currentState = gameStore.getState();
      if (currentState.status !== 'playing') {
        dragEvent.preventDefault();
        return;
      }

      const btn = (dragEvent.target as HTMLElement).closest<HTMLButtonElement>('.ingredient-card');
      if (!btn || btn.disabled) {
        dragEvent.preventDefault();
        return;
      }

      const id = btn.dataset.id;
      if (id && dragEvent.dataTransfer) {
        dragEvent.dataTransfer.setData('text/plain', id);
        dragEvent.dataTransfer.effectAllowed = 'copy';
      }
    });

    shelfCardsContainer.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.ingredient-card');
      if (!btn || btn.disabled) return;

      const id = btn.dataset.id;
      if (id) {
        gameStore.addIngredientToCauldron(id);
      }
    });

    shelfCardsContainer.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLButtonElement>('.ingredient-card');
      if (!btn) return;

      const tooltip = btn.querySelector('.ingredient-tooltip') as HTMLElement;
      if (!tooltip) return;

      tooltip.classList.remove('tooltip--left', 'tooltip--up');

      const rect = btn.getBoundingClientRect();
      const tooltipWidth = 150;
      const tooltipHeight = 90;

      if (rect.right + tooltipWidth > window.innerWidth) {
        tooltip.classList.add('tooltip--left');
      }
      if (rect.bottom + tooltipHeight > window.innerHeight) {
        tooltip.classList.add('tooltip--up');
      }
    }, true);
  }
}

export function renderShelf(container: HTMLElement): void {
  const state = gameStore.getState();
  const settings = DIFFICULTY_SETTINGS[state.difficulty || 'medium'];
  
  const existingCards = container.querySelectorAll<HTMLButtonElement>('.ingredient-card');
  if (!container.querySelector('.shelf-panel') || existingCards.length !== settings.shelfIngredientsCount) {
    buildShelf(container);
  }

  const panel = container.querySelector('.shelf-panel');
  if (panel) {
    panel.classList.toggle('paused', state.status === 'paused');
  }

  const isCauldronFull = state.cauldronIngredients.length >= settings.maxCauldronIngredients;

  container.querySelectorAll<HTMLButtonElement>('.ingredient-card').forEach((btn) => {
    const id = btn.dataset.id!;
    const stock = state.shelfStock[id] ?? 0;
    const isEmpty = stock <= 0;
    const isDisabled = isEmpty || isCauldronFull;

    if (btn.disabled !== isDisabled) btn.disabled = isDisabled;
    btn.classList.toggle('empty', isEmpty);
    btn.classList.toggle('disabled', isDisabled);

    const badge = btn.querySelector<HTMLElement>('.badge')!;
    const stockText = String(stock);
    if (badge.textContent !== stockText) badge.textContent = stockText;

    const img = btn.querySelector<HTMLImageElement>('img');
    if (img) {
      img.style.visibility = isEmpty ? 'hidden' : 'visible';
    }
  });
}