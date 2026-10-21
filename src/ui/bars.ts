import { calculateCauldron } from '../logic/calculate-cauldron';
import { gameStore } from '../state/game-state';


export function renderBars(container: HTMLElement): void {
  const state = gameStore.getState();
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
  const densityScale = { min: -30, max: 50 };
  const magicScale = { min: 0, max: 50 };

  const tempZone = getZonePercent(recipe.temperature.min, recipe.temperature.max, tempScale.min, tempScale.max);
  const densityZone = getZonePercent(recipe.density.min, recipe.density.max, densityScale.min, densityScale.max);
  const magicZone = getZonePercent(recipe.magicPower.min, recipe.magicPower.max, magicScale.min, magicScale.max);

  const isTempValid = totals.temperature >= recipe.temperature.min && totals.temperature <= recipe.temperature.max;
  const isDensityValid = totals.density >= recipe.density.min && totals.density <= recipe.density.max;
  const isMagicValid = totals.magicPower >= recipe.magicPower.min && totals.magicPower <= recipe.magicPower.max;

  container.innerHTML = `
    <div class="bars-panel">
      <h3>Cauldron Parameters</h3>
      
      <!-- Temperature Bar -->
      <div class="bar-row">
        <label>Temperature: <span>${totals.temperature}</span></label>
        <div class="progress-bar-container ${isTempValid ? 'glow' : ''}">
          <div class="target-zone" style="left: ${tempZone.left}%; width: ${tempZone.width}%;"></div>
          <div class="center-line"></div>
          <div class="marker" style="left: ${getPercent(totals.temperature, tempScale.min, tempScale.max)}%;"></div>
        </div>
      </div>

      <!-- Density Bar -->
      <div class="bar-row">
        <label>Density: <span>${totals.density}</span></label>
        <div class="progress-bar-container ${isDensityValid ? 'glow' : ''}">
          <div class="target-zone" style="left: ${densityZone.left}%; width: ${densityZone.width}%;"></div>
          <div class="center-line"></div>
          <div class="marker" style="left: ${getPercent(totals.density, densityScale.min, densityScale.max)}%;"></div>
        </div>
      </div>

      <!-- Magic Power Bar -->
      <div class="bar-row">
        <label>Magic Power: <span>${totals.magicPower}</span></label>
        <div class="progress-bar-container ${isMagicValid ? 'glow' : ''}">
          <div class="target-zone" style="left: ${magicZone.left}%; width: ${magicZone.width}%;"></div>
          <div class="center-line" style="left: 0%;"></div>
          <div class="marker" style="left: ${getPercent(totals.magicPower, magicScale.min, magicScale.max)}%;"></div>
        </div>
      </div>
    </div>
  `;
}