import { gameStore } from '../state/game-state';

export function renderGameOver(container: HTMLElement): void {
  const state = gameStore.getState() as any;
  const reason = state.gameOverReason || 'Game Over';

  container.innerHTML = `
    <div class="game-over-overlay">
      <div class="game-over-modal">
        <h2>Game Over</h2>
        <p class="reason">${reason}</p>
        <div class="final-score">Final Score: <strong>${state.score}</strong></div>
        <button class="play-again-btn">Play Again</button>
      </div>
    </div>
  `;

  const btn = container.querySelector('.play-again-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      gameStore.resetGame();
    });
  }
}
