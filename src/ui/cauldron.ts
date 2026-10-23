import { gameStore } from '../state/game-state';
import { INGREDIENT_IMAGES } from '../data/icons';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';

export function renderCauldron(container: HTMLElement): void {
  const state = gameStore.getState();
  const settings = DIFFICULTY_SETTINGS[state.difficulty || 'medium'];
  const maxCauldron = settings.maxCauldronIngredients;
  const cauldronIngredients = state.cauldronIngredients;

  const slotsHtml = Array.from({ length: maxCauldron })
    .map((_, index) => {
      const ingredient = cauldronIngredients[index];
      if (ingredient) {
        const imgUrl = INGREDIENT_IMAGES[ingredient.id] || '';
        return `
          <div class="cauldron-slot filled" title="${ingredient.name}">
            ${imgUrl ? `<img src="${imgUrl}" alt="${ingredient.name}" width="38" height="38" />` : ''}
          </div>
        `;
      }
      return `<div class="cauldron-slot empty"></div>`;
    })
    .join('');

  container.innerHTML = `
    <div class="cauldron-container" id="cauldron-drop-zone">
      <div class="cauldron-body">
        <div class="cauldron-header">
          <h3>Cauldron</h3>
          <span class="cauldron-counter">${cauldronIngredients.length} / ${maxCauldron}</span>
        </div>
        <div class="cauldron-slots">
          ${slotsHtml}
        </div>
      </div>
    </div>
  `;

  // Obsługa strefy upuszczania (Drag & Drop)
  const dropZone = container.querySelector('#cauldron-drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e: Event) => {
      const dragEvent = e as DragEvent;
      dragEvent.preventDefault();
      const currentState = gameStore.getState();
      const currentSettings = DIFFICULTY_SETTINGS[currentState.difficulty || 'medium'];
      
      if (currentState.status !== 'playing' || currentState.cauldronIngredients.length >= currentSettings.maxCauldronIngredients) {
        if (dragEvent.dataTransfer) dragEvent.dataTransfer.dropEffect = 'none';
        return;
      }

      if (dragEvent.dataTransfer) dragEvent.dataTransfer.dropEffect = 'copy';
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e: Event) => {
      const dragEvent = e as DragEvent;
      dragEvent.preventDefault();
      dropZone.classList.remove('drag-over');

      const currentState = gameStore.getState();
      if (currentState.status !== 'playing') return;

      const ingredientId = dragEvent.dataTransfer?.getData('text/plain');
      if (ingredientId) {
        gameStore.addIngredientToCauldron(ingredientId);
      }
    });
  }
}