import { gameStore } from '../state/game-state';

export function renderMenu(container: HTMLElement): void {
  container.innerHTML = `
    <div class="menu-container">
      <div class="menu-box">
        <h1>Alchemist's Cauldron</h1>
        <p>Mix ingredients, match target ranges, and brew potions before time or lives run out!</p>
        <div class="menu-buttons">
          <button class="start-game-btn" id="menu-start-btn">Start Game</button>
          <button class="menu-leaderboard-btn" id="menu-leaderboard-btn">Leaderboard</button>
          <button class="menu-help-btn" id="menu-help-btn">How to Play</button>
        </div>
      </div>

      <!-- Help / Rules Modal -->
      <div class="rules-modal-overlay" id="rules-modal" style="display: none;">
        <div class="rules-modal-box">
          <div class="rules-modal-header">
            <h2>Alchemical Codex (Rules)</h2>
            <button class="rules-close-icon" id="rules-close-icon">&times;</button>
          </div>
          <div class="rules-content">
            <section class="rule-section">
              <h3>🎯 The Goal</h3>
              <p>Add ingredients to the cauldron to move all three parameters (<strong>Temperature</strong>, <strong>Density</strong>, <strong>Magic Power</strong>) into the target recipe ranges, then click <strong>Brew Potion</strong>.</p>
            </section>

            <section class="rule-section">
              <h3>🌿 Ingredients & Shelf</h3>
              <p>Click on any ingredient card on the shelf to drop it into the cauldron (up to <strong>4 ingredients max</strong>). Each ingredient has limited stock (<strong>2–15 portions</strong>). Once exhausted (0), that slot is blocked.</p>
            </section>

            <section class="rule-section">
              <h3>🧪 Tolerance & Brewing</h3>
              <p>Level 1 operates on <strong>Medium</strong> difficulty with a <strong>±8 tolerance</strong> for all 3 ranges. If your mixture falls within the expanded ranges, the potion succeeds (+200 score and +10s bonus!). If not, you lose 1 life.</p>
            </section>

            <section class="rule-section">
              <h3>⏱️ Game Over Conditions</h3>
              <ul>
                <li><strong>Time's up:</strong> Timer hits 0s.</li>
                <li><strong>Out of lives:</strong> All 3 lives are lost.</li>
                <li><strong>Out of ingredients:</strong> All shelf stock is 0 and the cauldron is empty.</li>
              </ul>
            </section>
          </div>
          <div class="rules-footer">
            <button class="rules-close-btn" id="rules-close-btn">Understood, Alchemist!</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Start Game
  container.querySelector('#menu-start-btn')?.addEventListener('click', () => {
    gameStore.startGame();
  });

  // Leaderboard
  container.querySelector('#menu-leaderboard-btn')?.addEventListener('click', () => {
    gameStore.openLeaderboard('menu');
  });

  // Help / Rules modal
  const helpBtn = container.querySelector('#menu-help-btn');
  const rulesModal = container.querySelector<HTMLElement>('#rules-modal');
  const closeIcon = container.querySelector('#rules-close-icon');
  const closeBtn = container.querySelector('#rules-close-btn');

  const openRules = () => {
    if (rulesModal) rulesModal.style.display = 'flex';
  };
  const closeRules = () => {
    if (rulesModal) rulesModal.style.display = 'none';
  };

  helpBtn?.addEventListener('click', openRules);
  closeIcon?.addEventListener('click', closeRules);
  closeBtn?.addEventListener('click', closeRules);
}
