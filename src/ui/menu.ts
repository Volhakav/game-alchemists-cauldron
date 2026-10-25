import { gameStore } from '../state/game-state';
import { Difficulty } from '../data/types';
import { loadGame } from '../storage/save';

export function renderMenu(container: HTMLElement): void {
  const hasSavedGame = loadGame() !== null;

  container.innerHTML = `
    <div class="menu-container">
      <div class="menu-box">
        <h1>Alchemist's Cauldron</h1>
        <p>Mix ingredients, match target ranges, and brew legendary potions!</p>
        
        <div class="menu-actions">
          ${
            hasSavedGame
              ? `<button class="start-game-btn continue-btn" id="continue-game-btn">Continue Game</button>`
              : ''
          }

          <div class="difficulty-select-group">
            <h3>Select Difficulty:</h3>
            <div class="diff-buttons">
              <button class="diff-btn easy" data-diff="easy">Easy</button>
              <button class="diff-btn medium active" data-diff="medium">Medium</button>
              <button class="diff-btn hard" data-diff="hard">Hard</button>
            </div>
          </div>

          <button class="start-game-btn" id="start-game-btn">Start New Game</button>
          <button class="menu-btn leaderboard-menu-btn" id="menu-leaderboard-btn">Leaderboard</button>
          <button class="menu-btn help-btn" id="menu-help-btn">Help & Rules</button>
        </div>
      </div>

      <!-- Help Modal -->
      <div class="help-modal-overlay" id="help-modal" style="display: none;">
        <div class="help-modal-box">
          <h2>Game Rules</h2>
          <div class="help-content">
            <p><strong>Goal:</strong> Add ingredients from the shelf to the cauldron to match target ranges.</p>
            <p><strong>Brewing:</strong> Click <strong>Brew</strong> to check your mixture.</p>
          </div>
          <button class="back-btn" id="help-close-btn">Close</button>
        </div>
      </div>
    </div>
  `;

  let selectedDifficulty: Difficulty = 'medium';

  container.querySelectorAll('.diff-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.diff-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDifficulty = btn.getAttribute('data-diff') as Difficulty;
    });
  });

  container.querySelector('#continue-game-btn')?.addEventListener('click', () => {
    gameStore.continueGame();
  });

  container.querySelector('#start-game-btn')?.addEventListener('click', () => {
    gameStore.startGame(selectedDifficulty);
  });

  container.querySelector('#menu-leaderboard-btn')?.addEventListener('click', () => {
    gameStore.openLeaderboard('menu');
  });

  const helpModal = container.querySelector<HTMLElement>('#help-modal');
  container.querySelector('#menu-help-btn')?.addEventListener('click', () => {
    if (helpModal) helpModal.style.display = 'flex';
  });
  container.querySelector('#help-close-btn')?.addEventListener('click', () => {
    if (helpModal) helpModal.style.display = 'none';
  });
}
