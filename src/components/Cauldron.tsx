import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';
import { INGREDIENT_IMAGES } from '../data/icons';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';
import type { Difficulty, IGameState } from '../data/types';

export default function Cauldron() {
  const state = useGameStore();
  const currentDifficulty = (state.difficulty as Difficulty) || 'medium';
  const settings = DIFFICULTY_SETTINGS[currentDifficulty];
  const maxCauldron = settings.maxCauldronIngredients;
  const cauldronIngredients = state.cauldronIngredients;
  const isEmpty = cauldronIngredients.length === 0;
  const brewResult = (state as IGameState & { lastBrewResult?: string }).lastBrewResult;

  let animationClass = '';
  if (brewResult === 'success') animationClass = 'brew-success-anim';
  if (brewResult === 'failure') animationClass = 'brew-failure-anim';

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const s = gameStore.getState() as IGameState & { lastBrewResult?: string };
    if (s.lastBrewResult) delete s.lastBrewResult;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const currentState = gameStore.getState() as IGameState & { lastBrewResult?: string };
    const diff = (currentState.difficulty as Difficulty) || 'medium';
    const currentSettings = DIFFICULTY_SETTINGS[diff];

    if (
      currentState.status !== 'playing' ||
      currentState.cauldronIngredients.length >= currentSettings.maxCauldronIngredients
    ) {
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
      return;
    }

    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const currentState = gameStore.getState();
    if (currentState.status !== 'playing') return;
    const ingredientId = e.dataTransfer?.getData('text/plain');
    if (ingredientId) gameStore.addIngredientToCauldron(ingredientId);
  };

  const slots = Array.from({ length: maxCauldron }).map((_, index) => {
    const ingredient = cauldronIngredients[index];
    if (ingredient) {
      const imgUrl = INGREDIENT_IMAGES[ingredient.id] || '';
      return (
        <div key={index} className="cauldron-slot filled" title={ingredient.name}>
          {imgUrl ? (
            <img src={imgUrl} alt={ingredient.name} width={38} height={38} className="floating-icon" />
          ) : null}
        </div>
      );
    }
    return <div key={index} className="cauldron-slot empty" />;
  });

  return (
    <div
      className={`cauldron-container ${animationClass}`}
      id="cauldron-drop-zone"
      onAnimationEnd={handleAnimationEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="cauldron-body">
        <div className="cauldron-header">
          <h3>Cauldron</h3>
          <span className="cauldron-counter">
            {cauldronIngredients.length} / {maxCauldron}
          </span>
        </div>
        <div className="cauldron-slots">{slots}</div>
        <div className="cauldron-actions" style={{ marginTop: 10, textAlign: 'center' }}>
          <button
            className="pour-out-btn"
            id="pour-out-btn"
            disabled={isEmpty}
            onClick={() => gameStore.pourOut()}
          >
            Pour Out (-10s)
          </button>
        </div>
      </div>
    </div>
  );
}