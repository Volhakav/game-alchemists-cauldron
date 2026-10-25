import './styles/style.scss';
import { gameStore } from './state/game-state';
import { renderShelf } from './ui/shelf';
import { renderCauldron } from './ui/cauldron';
import { renderBars } from './ui/bars';
import { renderRecipePanel } from './ui/recipe';
import { renderGameOver } from './ui/gameOver';
import { renderMenu } from './ui/menu';
import { renderPauseModal } from './ui/pauseModal';
import { renderLeaderboard } from './ui/leaderboard';
import { formatTime } from './logic/time';
import { initKeyboardHandler } from './logic/keyboard';

// Inicjalizacja globalnej obsługi skrótów klawiszowych (US 3.6)
initKeyboardHandler();

const app = document.querySelector('#app') as HTMLElement;

function buildGameLayout(container: HTMLElement) {
  container.innerHTML = `
    <div class="game-container">
      <header class="game-header">
        <div class="header-top">
          <h1>Alchemist's Cauldron</h1>
          <button class="pause-btn" id="pause-trigger-btn" title="Pause">⏸</button>
        </div>
        <div class="game-stats">
          <span>Score: <strong id="score-text">0</strong></span>
          <span>Lives: <strong id="lives-text"></strong></span>
          <div class="timer-wrapper">
            <span>Time: <strong id="timer-text"></strong></span>
            <div class="timer-bar-container">
              <div class="timer-bar-fill" id="timer-bar"></div>
            </div>
          </div>
        </div>
      </header>
      <main class="game-main">
        <aside id="shelf-container"></aside>
        <section id="cauldron-container"></section>
        <aside id="recipe-container"></aside>
        <aside id="bars-container"></aside>
      </main>
    </div>
  `;

  document.getElementById('pause-trigger-btn')?.addEventListener('click', () => {
    gameStore.pauseGame();
  });
}

function initApp() {
  const updateUI = () => {
    const state = gameStore.getState();

    if (state.status === 'menu') {
      if (!document.getElementById('menu-root')) {
        app.innerHTML = `<div id="menu-root"></div>`;
        renderMenu(document.getElementById('menu-root') as HTMLElement);
      }
      return;
    }

    if (state.status === 'leaderboard') {
      if (!document.getElementById('leaderboard-root')) {
        app.innerHTML = `<div id="leaderboard-root"></div>`;
        renderLeaderboard(document.getElementById('leaderboard-root') as HTMLElement);
      }
      return;
    }

    if (state.status === 'game-over') {
      if (!document.getElementById('game-over-container')) {
        app.innerHTML = `<div id="game-over-container"></div>`;
      }
      renderGameOver(document.getElementById('game-over-container') as HTMLElement);
      return;
    }

    const isPaused = state.status === 'paused';

    if (!app.querySelector('.game-container')) {
      buildGameLayout(app);
    }

    const gameContainer = app.querySelector<HTMLElement>('.game-container');
    if (gameContainer) {
      gameContainer.classList.toggle('blurred', isPaused);
    }

    let pauseModalContainer = document.getElementById('pause-modal-container');
    if (isPaused) {
      if (!pauseModalContainer) {
        pauseModalContainer = document.createElement('div');
        pauseModalContainer.id = 'pause-modal-container';
        app.appendChild(pauseModalContainer);
        renderPauseModal(pauseModalContainer);
      }
      return;
    } else if (pauseModalContainer) {
      pauseModalContainer.remove();
    }

    const scoreText = document.getElementById('score-text');
    if (scoreText && scoreText.textContent !== String(state.score)) {
      scoreText.textContent = String(state.score);
    }

    const livesText = document.getElementById('lives-text');
    const livesStr = '❤️'.repeat(Math.max(0, state.lives));
    if (livesText && livesText.textContent !== livesStr) {
      livesText.textContent = livesStr;
    }

    const timerText = document.getElementById('timer-text');
    const timerBar = document.getElementById('timer-bar');

    if (timerText && timerBar) {
      const formatted = formatTime(state.timeLeft);
      if (timerText.textContent !== formatted) {
        timerText.textContent = formatted;
      }
      timerBar.style.width = `${(state.timeLeft / 150) * 100}%`;

      if (state.timeLeft <= 15) {
        timerText.classList.add('pulse-red');
        timerBar.classList.add('pulse-bar');
      } else {
        timerText.classList.remove('pulse-red');
        timerBar.classList.remove('pulse-bar');
      }
    }

    const shelfContainer = document.getElementById('shelf-container') as HTMLElement;
    const cauldronContainer = document.getElementById('cauldron-container') as HTMLElement;
    const recipeContainer = document.getElementById('recipe-container') as HTMLElement;
    const barsContainer = document.getElementById('bars-container') as HTMLElement;

    if (shelfContainer) renderShelf(shelfContainer);
    if (cauldronContainer) renderCauldron(cauldronContainer);
    if (recipeContainer) renderRecipePanel(recipeContainer);
    if (barsContainer) renderBars(barsContainer);
  };

  gameStore.subscribe(updateUI);
  updateUI();
}

initApp();