import { gameStore } from '../state/game-state';
import { INGREDIENT_IMAGES } from '../data/icons';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';
import { Difficulty } from '../data/types';

export function renderCauldron(container: HTMLElement): void {
  const state = gameStore.getState() as any;
  const currentDifficulty = (state.difficulty as Difficulty) || 'medium';
  const settings = DIFFICULTY_SETTINGS[currentDifficulty];
  const maxCauldron = settings.maxCauldronIngredients;
  const cauldronIngredients = state.cauldronIngredients;
  const isEmpty = cauldronIngredients.length === 0;
  const brewResult = state.lastBrewResult; 
  const slotsHtml = Array.from({ length: maxCauldron })
    .map((_, index) => {
      const ingredient = cauldronIngredients[index];
      if (ingredient) {
        const imgUrl = INGREDIENT_IMAGES[ingredient.id] || '';
        return `
          <div class="cauldron-slot filled" title="${ingredient.name}">
            ${imgUrl ? `<img src="${imgUrl}" alt="${ingredient.name}" width="38" height="38" class="floating-icon" />` : ''}
          </div>
        `;
      }
      return `<div class="cauldron-slot empty"></div>`;
    })
    .join('');

  let animationClass = '';
  if (brewResult === 'success') animationClass = 'brew-success-anim';
  if (brewResult === 'failure') animationClass = 'brew-failure-anim';

  container.innerHTML = `
    <div class="cauldron-container ${animationClass}" id="cauldron-drop-zone">
      <div class="cauldron-body">
        <div class="cauldron-header">
          <h3>Cauldron</h3>
          <span class="cauldron-counter">${cauldronIngredients.length} / ${maxCauldron}</span>
        </div>
        <div class="cauldron-slots">
          ${slotsHtml}
        </div>
        <div class="cauldron-actions" style="margin-top: 10px; text-align: center;">
          <button class="pour-out-btn" id="pour-out-btn" ${isEmpty ? 'disabled' : ''}>
            Pour Out (-10s)
          </button>
        </div>
      </div>
    </div>
  `;

  const cauldronContainer = container.querySelector('#cauldron-drop-zone');
  if (cauldronContainer && brewResult) {
    cauldronContainer.addEventListener('animationend', () => {
      delete state.lastBrewResult;
    }, { once: true });
  }

  const pourOutBtn = container.querySelector('#pour-out-btn');
  if (pourOutBtn) {
    pourOutBtn.addEventListener('click', () => {
      gameStore.pourOut();
    });
  }

  const dropZone = container.querySelector('#cauldron-drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', (e: Event) => {
      const dragEvent = e as DragEvent;
      dragEvent.preventDefault();
      const currentState = gameStore.getState() as any;
      const diff = (currentState.difficulty as Difficulty) || 'medium';
      const currentSettings = DIFFICULTY_SETTINGS[diff];
      
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