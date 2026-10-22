import { gameStore } from '../state/game-state';
import { isTop10Score, validatePlayerName, addLeaderboardEntry } from '../storage/leaderboard';

export function renderGameOver(container: HTMLElement): void {
  const state = gameStore.getState();
  const reason = state.gameOverReason || 'Game Over';
  const score = state.score;
  const isEligibleForTop10 = isTop10Score(score);
  const alreadySubmitted = gameStore.isScoreSubmitted();

  let inputSectionHtml = '';
  if (isEligibleForTop10 && !alreadySubmitted) {
    inputSectionHtml = `
      <div class="top10-congrats">
        <span class="badge-new-record">🎉 TOP-10 RECORD!</span>
        <label for="player-name-input" class="name-label">Enter your name (2–15 chars):</label>
        <div class="input-row">
          <input 
            type="text" 
            id="player-name-input" 
            class="player-name-input" 
            placeholder="AlchemistName" 
            maxlength="15" 
            autocomplete="off" 
          />
        </div>
        <div id="name-validation-error" class="name-validation-error" style="display: none;"></div>
      </div>
    `;
  } else if (alreadySubmitted) {
    inputSectionHtml = `
      <div class="score-submitted-notice">
        <span>✨ Score saved to Leaderboard!</span>
      </div>
    `;
  } else {
    inputSectionHtml = `
      <div class="not-top10-notice">
        <span>Brew more potions next time to enter the Top-10!</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="game-over-overlay">
      <div class="game-over-modal">
        <h2>Game Over</h2>
        <p class="reason">${reason}</p>
        <div class="final-score">Final Score: <strong>${score}</strong></div>
        
        ${inputSectionHtml}

        <div class="game-over-actions">
          ${isEligibleForTop10 && !alreadySubmitted ? '<button class="submit-score-btn" id="submit-score-btn">Submit Score</button>' : ''}
          <button class="play-again-btn" id="replay-btn">Replay</button>
          <button class="game-over-leaderboard-btn" id="game-over-leaderboard-btn">Leaderboard</button>
        </div>
      </div>
    </div>
  `;

  // Replay
  container.querySelector('#replay-btn')?.addEventListener('click', () => {
    gameStore.startGame();
  });

  // Open Leaderboard
  container.querySelector('#game-over-leaderboard-btn')?.addEventListener('click', () => {
    gameStore.openLeaderboard('game-over');
  });

  // Submit Score Handling
  const submitBtn = container.querySelector('#submit-score-btn');
  const nameInput = container.querySelector<HTMLInputElement>('#player-name-input');
  const errorEl = container.querySelector<HTMLElement>('#name-validation-error');

  const handleSubmit = () => {
    if (!nameInput) return;
    const name = nameInput.value;
    const validation = validatePlayerName(name);

    if (!validation.isValid) {
      if (errorEl) {
        errorEl.textContent = validation.error || 'Invalid name';
        errorEl.style.display = 'block';
      }
      nameInput.classList.add('input-error');
      nameInput.focus();
      return;
    }

    if (errorEl) {
      errorEl.style.display = 'none';
    }
    nameInput.classList.remove('input-error');

    // Add to leaderboard
    addLeaderboardEntry(name, score);
    gameStore.markScoreSubmitted();

    // Directly open leaderboard to show their entry
    gameStore.openLeaderboard('game-over');
  };

  submitBtn?.addEventListener('click', handleSubmit);

  nameInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  });

  nameInput?.addEventListener('input', () => {
    if (errorEl && errorEl.style.display !== 'none') {
      errorEl.style.display = 'none';
      nameInput.classList.remove('input-error');
    }
  });
}
