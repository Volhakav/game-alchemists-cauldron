import { gameStore } from '../state/game-state';

export function renderPauseModal(container: HTMLElement): void {
  container.innerHTML = `
    <div class="pause-overlay">
      <div class="pause-modal">
        <h2>Game Paused</h2>
        <button class="resume-btn">Resume</button>
        <button class="exit-btn">Exit to Menu</button>
      </div>
    </div>
  `;

  container.querySelector('.resume-btn')?.addEventListener('click', () => {
    gameStore.resumeGame();
  });

  container.querySelector('.exit-btn')?.addEventListener('click', () => {
    gameStore.exitToMenu();
  });
}
