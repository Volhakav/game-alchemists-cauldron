import './styles/style.scss';
import { gameStore } from './state/game-state';
import { renderShelf } from './ui/shelf';
import { renderCauldron } from './ui/cauldron';
import { renderBars } from './ui/bars';
import { renderRecipePanel } from './ui/recipe';

const app = document.querySelector('#app') as HTMLElement;

function initApp() {
  app.innerHTML = `
    <div class="game-container">
      <header class="game-header">
        <h1>Alchemist's Cauldron</h1>
        <div class="game-stats" id="game-stats"></div>
      </header>
      <main class="game-main">
        <aside id="shelf-container"></aside>
        <section id="cauldron-container"></section>
        <aside id="recipe-container"></aside>
        <aside id="bars-container"></aside>
      </main>
    </div>
  `;

  const shelfContainer = document.getElementById('shelf-container') as HTMLElement;
  const cauldronContainer = document.getElementById('cauldron-container') as HTMLElement;
  const recipeContainer = document.getElementById('recipe-container') as HTMLElement;
  const barsContainer = document.getElementById('bars-container') as HTMLElement;
  const statsContainer = document.getElementById('game-stats') as HTMLElement;

  const updateUI = () => {
    const state = gameStore.getState();

    // Wyświetlanie statystyk (punkty, życia, czas)
    statsContainer.innerHTML = `
      <span>Score: <strong>${state.score}</strong></span>
      <span>Lives: <strong>${'❤️'.repeat(state.lives)}</strong></span>
      <span>Time: <strong>${state.timeLeft}s</strong></span>
    `;

    renderShelf(shelfContainer);
    renderCauldron(cauldronContainer);
    renderRecipePanel(recipeContainer);
    renderBars(barsContainer);
  };

  gameStore.subscribe(updateUI);
  updateUI();
}

initApp();