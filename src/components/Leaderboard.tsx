import { useState } from 'react';
import type { ReactElement } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';
import {
  getLeaderboard,
  clearLeaderboard,
  formatLeaderboardDate,
  ILeaderboardEntry,
} from '../storage/leaderboard';
import type { Difficulty } from '../data/types';

function renderTableRows(entries: ILeaderboardEntry[]): ReactElement {
  if (entries.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="empty-leaderboard">
          No records yet for this difficulty.
        </td>
      </tr>
    );
  }

  return (
    <>
      {entries.map((entry, index) => {
        const rank = index + 1;
        let rankContent: ReactElement | string = <span className="rank-number">{rank}</span>;
        if (rank === 1) rankContent = <span className="rank-badge gold">🥇 1</span>;
        else if (rank === 2) rankContent = <span className="rank-badge silver">🥈 2</span>;
        else if (rank === 3) rankContent = <span className="rank-badge bronze">🥉 3</span>;

        return (
          <tr key={entry.id} className={`leaderboard-row rank-${rank}`}>
            <td className="col-rank">{rankContent}</td>
            <td className="col-name" title={entry.name}>
              {entry.name}
            </td>
            <td className="col-difficulty">
              <span className={`diff-badge ${entry.difficulty}`}>{entry.difficulty}</span>
            </td>
            <td className="col-score">
              <strong>{entry.score}</strong>
            </td>
            <td className="col-date">{formatLeaderboardDate(entry.date)}</td>
          </tr>
        );
      })}
    </>
  );
}

export default function Leaderboard() {
  const state = useGameStore();
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(
    state.difficulty || 'medium'
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [entries, setEntries] = useState<ILeaderboardEntry[]>(() =>
    getLeaderboard(currentDifficulty)
  );

  const switchDifficulty = (diff: Difficulty) => {
    setCurrentDifficulty(diff);
    setEntries(getLeaderboard(diff));
  };

  const handleClear = () => {
    clearLeaderboard(currentDifficulty);
    setEntries([]);
    setConfirmOpen(false);
  };

  return (
    <div className="leaderboard-overlay">
      <div className="leaderboard-modal">
        <div className="leaderboard-header">
          <h2>Top Alchemists Leaderboard</h2>
          <div className="difficulty-tabs">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
              <button
                key={diff}
                className={`diff-tab ${currentDifficulty === diff ? 'active' : ''}`}
                data-diff={diff}
                onClick={() => switchDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="col-rank">Rank</th>
                <th className="col-name">Name</th>
                <th className="col-difficulty">Difficulty</th>
                <th className="col-score">Score</th>
                <th className="col-date">Date</th>
              </tr>
            </thead>
            <tbody id="leaderboard-body">{renderTableRows(entries)}</tbody>
          </table>
        </div>

        <div className="leaderboard-footer">
          <button
            className="clear-btn"
            id="clear-leaderboard-btn"
            onClick={() => setConfirmOpen(true)}
          >
            Clear Leaderboard
          </button>
          <button
            className="back-btn"
            id="leaderboard-back-btn"
            onClick={() => gameStore.closeLeaderboard()}
          >
            Back
          </button>
        </div>

        {confirmOpen && (
          <div className="confirm-dialog-overlay" id="confirm-clear-dialog" style={{ display: 'flex' }}>
            <div className="confirm-dialog-box">
              <h3>Clear Leaderboard?</h3>
              <p>Are you sure you want to delete records for {currentDifficulty}?</p>
              <div className="confirm-dialog-actions">
                <button
                  className="confirm-cancel-btn"
                  id="confirm-cancel-btn"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-danger-btn"
                  id="confirm-accept-btn"
                  onClick={handleClear}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}