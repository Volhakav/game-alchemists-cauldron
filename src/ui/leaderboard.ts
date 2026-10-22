import { gameStore } from '../state/game-state';
import {
  getLeaderboard,
  clearLeaderboard,
  formatLeaderboardDate,
  ILeaderboardEntry,
} from '../storage/leaderboard';

function renderTableRows(entries: ILeaderboardEntry[]): string {
  if (entries.length === 0) {
    return `
      <tr>
        <td colspan="4" class="empty-leaderboard">
          No records yet. Brew potions and set the first record!
        </td>
      </tr>
    `;
  }

  return entries
    .map((entry, index) => {
      const rank = index + 1;
      let rankContent = `<span class="rank-number">${rank}</span>`;
      if (rank === 1) {
        rankContent = `<span class="rank-badge gold" title="1st Place">🥇 1</span>`;
      } else if (rank === 2) {
        rankContent = `<span class="rank-badge silver" title="2nd Place">🥈 2</span>`;
      } else if (rank === 3) {
        rankContent = `<span class="rank-badge bronze" title="3rd Place">🥉 3</span>`;
      }

      return `
        <tr class="leaderboard-row rank-${rank}">
          <td class="col-rank">${rankContent}</td>
          <td class="col-name" title="${entry.name}">${entry.name}</td>
          <td class="col-score"><strong>${entry.score}</strong></td>
          <td class="col-date">${formatLeaderboardDate(entry.date)}</td>
        </tr>
      `;
    })
    .join('');
}

export function renderLeaderboard(container: HTMLElement): void {
  const entries = getLeaderboard();

  container.innerHTML = `
    <div class="leaderboard-overlay">
      <div class="leaderboard-modal">
        <div class="leaderboard-header">
          <h2>Top Alchemists Leaderboard</h2>
          <p class="subtitle">Best potions masters of all time</p>
        </div>

        <div class="leaderboard-table-container">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th class="col-rank">Rank</th>
                <th class="col-name">Name</th>
                <th class="col-score">Score</th>
                <th class="col-date">Date</th>
              </tr>
            </thead>
            <tbody id="leaderboard-body">
              ${renderTableRows(entries)}
            </tbody>
          </table>
        </div>

        <div class="leaderboard-footer">
          <button class="clear-btn" id="clear-leaderboard-btn">Clear Leaderboard</button>
          <button class="back-btn" id="leaderboard-back-btn">Back</button>
        </div>

        <!-- Custom In-App Confirmation Modal -->
        <div class="confirm-dialog-overlay" id="confirm-clear-dialog" style="display: none;">
          <div class="confirm-dialog-box">
            <h3>Clear Leaderboard?</h3>
            <p>Are you sure you want to delete all leaderboard records? This cannot be undone.</p>
            <div class="confirm-dialog-actions">
              <button class="confirm-cancel-btn" id="confirm-cancel-btn">Cancel</button>
              <button class="confirm-danger-btn" id="confirm-accept-btn">Clear All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Back button
  container.querySelector('#leaderboard-back-btn')?.addEventListener('click', () => {
    gameStore.closeLeaderboard();
  });

  // Clear Leaderboard dialog triggers
  const clearBtn = container.querySelector('#clear-leaderboard-btn');
  const confirmDialog = container.querySelector<HTMLElement>('#confirm-clear-dialog');
  const cancelBtn = container.querySelector('#confirm-cancel-btn');
  const acceptBtn = container.querySelector('#confirm-accept-btn');
  const tbody = container.querySelector<HTMLElement>('#leaderboard-body');

  if (clearBtn && confirmDialog) {
    clearBtn.addEventListener('click', () => {
      confirmDialog.style.display = 'flex';
    });
  }

  if (cancelBtn && confirmDialog) {
    cancelBtn.addEventListener('click', () => {
      confirmDialog.style.display = 'none';
    });
  }

  if (acceptBtn && confirmDialog && tbody) {
    acceptBtn.addEventListener('click', () => {
      clearLeaderboard();
      confirmDialog.style.display = 'none';
      tbody.innerHTML = renderTableRows([]);
    });
  }
}
