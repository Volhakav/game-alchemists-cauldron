import { calculateCauldron } from '../logic/calculate-cauldron';
import { gameStore } from '../state/game-state';

function buildBars(container: HTMLElement): void {
  container.innerHTML = `
    <div class="bars-panel">
      <h3>Cauldron Parameters</h3>
      
      <!-- Temperature Bar -->
      <div class="bar-row">
        <label>Temperature: <span data-value="temp">0</span></label>
        <div class="progress-bar-container" data-bar="temp">
          <div class="target-zone" data-zone="temp"></div>
          <div class="center-line"></div>
          <div class="marker" data-marker="temp"></div>
        </div>
      </div>

      <!-- Density Bar -->
      <div class="bar-row">
        <label>Density: <span data-value="density">0</span></label>
        <div class="progress-bar-container" data-bar="density">
          <div class="target-zone" data-zone="density"></div>
          <div class="center-line"></div>
          <div class="marker" data-marker="density"></div>
        </div>
      </div>

      <!-- Magic Power Bar -->
      <div class="bar-row">
        <label>Magic Power: <span data-value="magic">0</span></label>
        <div class="progress-bar-container" data-bar="magic">
          <div class="target-zone" data-zone="magic"></div>
          <div class="center-line" style="left: 0%;"></div>
          <div class="marker" data-marker="magic"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderBars(container: HTMLElement): void {
  if (!container.querySelector('.bars-panel')) {
    buildBars(container);
  }

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

  const tempZone = getZonePercent(
    recipe.temperature.min,
    recipe.temperature.max,
    tempScale.min,
    tempScale.max
  );
  const densityZone = getZonePercent(
    recipe.density.min,
    recipe.density.max,
    densityScale.min,
    densityScale.max
  );
  const magicZone = getZonePercent(
    recipe.magicPower.min,
    recipe.magicPower.max,
    magicScale.min,
    magicScale.max
  );

  const isTempValid =
    totals.temperature >= recipe.temperature.min && totals.temperature <= recipe.temperature.max;
  const isDensityValid =
    totals.density >= recipe.density.min && totals.density <= recipe.density.max;
  const isMagicValid =
    totals.magicPower >= recipe.magicPower.min && totals.magicPower <= recipe.magicPower.max;

  // Temperature
  const tempVal = container.querySelector('[data-value="temp"]');
  if (tempVal && tempVal.textContent !== String(totals.temperature))
    tempVal.textContent = String(totals.temperature);
  const tempBar = container.querySelector('[data-bar="temp"]');
  if (tempBar) tempBar.classList.toggle('glow', isTempValid);
  const tempZoneEl = container.querySelector<HTMLElement>('[data-zone="temp"]');
  if (tempZoneEl) {
    tempZoneEl.style.left = `${tempZone.left}%`;
    tempZoneEl.style.width = `${tempZone.width}%`;
  }
  const tempMarker = container.querySelector<HTMLElement>('[data-marker="temp"]');
  if (tempMarker)
    tempMarker.style.left = `${getPercent(totals.temperature, tempScale.min, tempScale.max)}%`;

  // Density
  const densityVal = container.querySelector('[data-value="density"]');
  if (densityVal && densityVal.textContent !== String(totals.density))
    densityVal.textContent = String(totals.density);
  const densityBar = container.querySelector('[data-bar="density"]');
  if (densityBar) densityBar.classList.toggle('glow', isDensityValid);
  const densityZoneEl = container.querySelector<HTMLElement>('[data-zone="density"]');
  if (densityZoneEl) {
    densityZoneEl.style.left = `${densityZone.left}%`;
    densityZoneEl.style.width = `${densityZone.width}%`;
  }
  const densityMarker = container.querySelector<HTMLElement>('[data-marker="density"]');
  if (densityMarker)
    densityMarker.style.left = `${getPercent(totals.density, densityScale.min, densityScale.max)}%`;

  // Magic Power
  const magicVal = container.querySelector('[data-value="magic"]');
  if (magicVal && magicVal.textContent !== String(totals.magicPower))
    magicVal.textContent = String(totals.magicPower);
  const magicBar = container.querySelector('[data-bar="magic"]');
  if (magicBar) magicBar.classList.toggle('glow', isMagicValid);
  const magicZoneEl = container.querySelector<HTMLElement>('[data-zone="magic"]');
  if (magicZoneEl) {
    magicZoneEl.style.left = `${magicZone.left}%`;
    magicZoneEl.style.width = `${magicZone.width}%`;
  }
  const magicMarker = container.querySelector<HTMLElement>('[data-marker="magic"]');
  if (magicMarker)
    magicMarker.style.left = `${getPercent(totals.magicPower, magicScale.min, magicScale.max)}%`;
}
