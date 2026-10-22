import { INGREDIENTS } from '../data/ingredients';
import { INGREDIENT_IMAGES } from '../data/icons';
import { gameStore } from '../state/game-state';

const MAX_CAULDRON = 4;

/** Buduje strukturę panelu tylko raz dla aktywnych składników na półce. */
function buildShelf(container: HTMLElement): void {
  const state = gameStore.getState();
  // Dla Level 1 (Medium) bierzemy składniki obecne w shelfStock (6 składników)
  const activeIngredients = INGREDIENTS.filter((ing) => state.shelfStock[ing.id] !== undefined);

  const cardsHtml = activeIngredients
    .map((ing) => {
      const imgUrl = INGREDIENT_IMAGES[ing.id] || '';
      const t = ing.temperature > 0 ? `+${ing.temperature}` : `${ing.temperature}`;
      const d = ing.density > 0 ? `+${ing.density}` : `${ing.density}`;
      const m = ing.magicPower > 0 ? `+${ing.magicPower}` : `${ing.magicPower}`;

      return `
        <button class="ingredient-card" data-id="${ing.id}">
          <span class="icon">
            ${imgUrl ? `<img src="${imgUrl}" alt="${ing.name}" width="36" height="36" />` : ''}
          </span>
          <div class="info">
            <span class="name">${ing.name}</span>
            <span class="stats">T${t} D${d} M${m}</span>
          </div>
          <span class="badge"></span>
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

  // Jeden listener (event delegation) - przeżyje wszystkie aktualizacje,
  // bo elementy .ingredient-card nie są już niszczone.
  container.querySelector('.shelf-cards')!.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.ingredient-card');
    if (!btn || btn.disabled) return;

    const id = btn.dataset.id;
    if (id) {
      gameStore.addIngredientToCauldron(id);
    }
  });
}

export function renderShelf(container: HTMLElement): void {
  // Struktura powstaje tylko wtedy, gdy jeszcze jej nie ma.
  if (!container.querySelector('.shelf-panel')) {
    buildShelf(container);
  }

  const state = gameStore.getState();
  const isCauldronFull = state.cauldronIngredients.length >= MAX_CAULDRON;

  // Aktualizujemy tylko to, co zależy od stanu.
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

    // visibility zamiast usuwania <img>, żeby obrazek nie ładował się od nowa.
    const img = btn.querySelector<HTMLImageElement>('img');
    if (img) {
      img.style.visibility = isEmpty ? 'hidden' : 'visible';
    }
  });
}
