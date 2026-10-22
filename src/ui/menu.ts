import { gameStore } from '../state/game-state';

export function renderMenu(container: HTMLElement): void {
  container.innerHTML = `
    <div class="menu-container">
      <div class="menu-box">
        <h1>Alchemist's Cauldron</h1>
        <p>Mix ingredients, balance parameters, and brew legendary potions!</p>
        <button class="start-game-btn">Start Game</button>
        <button class="menu-leaderboard-btn" id="menu-leaderboard-btn">Leaderboard</button>
      </div>
    </div>
  `;

  container.querySelector('.start-game-btn')?.addEventListener('click', () => {
    gameStore.startGame();
  });

  container.querySelector('#menu-leaderboard-btn')?.addEventListener('click', () => {
    gameStore.openLeaderboard('menu');
  });
}
