import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';
import { INGREDIENTS } from '../data/ingredients';
import { INGREDIENT_IMAGES } from '../data/icons';
import { DIFFICULTY_SETTINGS } from '../data/difficulty';

export default function Shelf() {
  const state = useGameStore();
  const settings = DIFFICULTY_SETTINGS[state.difficulty || 'medium'];
  const activeIngredients = INGREDIENTS.slice(0, settings.shelfIngredientsCount);
  const isCauldronFull = state.cauldronIngredients.length >= settings.maxCauldronIngredients;

  const handleTooltipPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const tooltip = btn.querySelector('.ingredient-tooltip') as HTMLElement | null;
    if (!tooltip) return;
    tooltip.classList.remove('tooltip--left', 'tooltip--up');
    const rect = btn.getBoundingClientRect();
    const tooltipWidth = 150;
    const tooltipHeight = 90;
    if (rect.right + tooltipWidth > window.innerWidth) tooltip.classList.add('tooltip--left');
    if (rect.bottom + tooltipHeight > window.innerHeight) tooltip.classList.add('tooltip--up');
  };

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, id: string) => {
    if (state.status !== 'playing') {
      e.preventDefault();
      return;
    }
    const btn = e.currentTarget;
    if (btn.disabled) {
      e.preventDefault();
      return;
    }
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', id);
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  return (
    <div className={`shelf-panel ${state.status === 'paused' ? 'paused' : ''}`}>
      <h3>Ingredients</h3>
      <div className="shelf-cards">
        {activeIngredients.map((ing) => {
          const stock = state.shelfStock[ing.id] ?? 0;
          const isEmpty = stock <= 0;
          const isDisabled = isEmpty || isCauldronFull;
          const imgUrl = INGREDIENT_IMAGES[ing.id] || '';
          const t = ing.temperature >= 0 ? `+${ing.temperature}` : `-${Math.abs(ing.temperature)}`;
          const d = ing.density >= 0 ? `+${ing.density}` : `-${Math.abs(ing.density)}`;
          const m = ing.magicPower >= 0 ? `+${ing.magicPower}` : `-${Math.abs(ing.magicPower)}`;

          return (
            <button
              key={ing.id}
              className={`ingredient-card ${isEmpty ? 'empty' : ''} ${isDisabled ? 'disabled' : ''}`}
              data-id={ing.id}
              draggable
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) gameStore.addIngredientToCauldron(ing.id);
              }}
              onDragStart={(e) => handleDragStart(e, ing.id)}
              onMouseEnter={handleTooltipPosition}
            >
              <span className="icon">
                {imgUrl ? <img src={imgUrl} alt={ing.name} width={36} height={36} /> : null}
              </span>
              <div className="info">
                <span className="name">{ing.name}</span>
              </div>
              <span className="badge">{stock}</span>
              <div className="ingredient-tooltip">
                <div className="tooltip-row">Temp: {t}</div>
                <div className="tooltip-row">Density: {d}</div>
                <div className="tooltip-row">Magic: {m}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}