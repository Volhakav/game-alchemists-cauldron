import { useGameStore } from '../hooks/useGameStore';
import { calculateCauldron } from '../logic/calculate-cauldron';

export default function Bars() {
  const state = useGameStore();
  const totals = calculateCauldron(state.cauldronIngredients);
  const recipe = state.activeRecipe;

  const getPercent = (val: number, minScale = -50, maxScale = 100) => {
    const clamped = Math.max(minScale, Math.min(maxScale, val));
    return ((clamped - minScale) / (maxScale - minScale)) * 100;
  };

  const getZonePercent = (min: number, max: number, minScale = -50, maxScale = 100) => {
    const left = getPercent(min, minScale, maxScale);
    const right = getPercent(max, minScale, maxScale);
    return { left, width: right - left };
  };

  const tempScale = { min: -50, max: 100 };
  const densityScale = { min: -30, max: 60 };
  const magicScale = { min: 0, max: 80 };

  const tempZone = getZonePercent(recipe.temperature.min, recipe.temperature.max, tempScale.min, tempScale.max);
  const densityZone = getZonePercent(recipe.density.min, recipe.density.max, densityScale.min, densityScale.max);
  const magicZone = getZonePercent(recipe.magicPower.min, recipe.magicPower.max, magicScale.min, magicScale.max);

  const isTempValid = totals.temperature >= recipe.temperature.min && totals.temperature <= recipe.temperature.max;
  const isDensityValid = totals.density >= recipe.density.min && totals.density <= recipe.density.max;
  const isMagicValid = totals.magicPower >= recipe.magicPower.min && totals.magicPower <= recipe.magicPower.max;

  return (
    <div className="bars-panel">
      <h3>Cauldron Parameters</h3>

      <div className="bar-row">
        <label>
          Temperature: <span data-value="temp">{totals.temperature}</span>
        </label>
        <div className={`progress-bar-container ${isTempValid ? 'glow' : ''}`} data-bar="temp">
          <div className="target-zone" data-zone="temp" style={{ left: `${tempZone.left}%`, width: `${tempZone.width}%` }} />
          <div className="center-line" />
          <div className="marker" data-marker="temp" style={{ left: `${getPercent(totals.temperature, tempScale.min, tempScale.max)}%` }} />
        </div>
      </div>

      <div className="bar-row">
        <label>
          Density: <span data-value="density">{totals.density}</span>
        </label>
        <div className={`progress-bar-container ${isDensityValid ? 'glow' : ''}`} data-bar="density">
          <div className="target-zone" data-zone="density" style={{ left: `${densityZone.left}%`, width: `${densityZone.width}%` }} />
          <div className="center-line" />
          <div className="marker" data-marker="density" style={{ left: `${getPercent(totals.density, densityScale.min, densityScale.max)}%` }} />
        </div>
      </div>

      <div className="bar-row">
        <label>
          Magic Power: <span data-value="magic">{totals.magicPower}</span>
        </label>
        <div className={`progress-bar-container ${isMagicValid ? 'glow' : ''}`} data-bar="magic">
          <div className="target-zone" data-zone="magic" style={{ left: `${magicZone.left}%`, width: `${magicZone.width}%` }} />
          <div className="center-line" style={{ left: '0%' }} />
          <div className="marker" data-marker="magic" style={{ left: `${getPercent(totals.magicPower, magicScale.min, magicScale.max)}%` }} />
        </div>
      </div>
    </div>
  );
}