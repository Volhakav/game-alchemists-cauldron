import { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';
import {
  isTop10Score,
  validatePlayerName,
  addLeaderboardEntry,
} from '../storage/leaderboard';

export default function GameOver() {
  const state = useGameStore();
  const reason = state.gameOverReason || 'Game Over';
  const score = state.score;
  const difficulty = state.difficulty || 'medium';

  const isEligibleForTop10 = isTop10Score(difficulty, score);
  const alreadySubmitted = gameStore.isScoreSubmitted();

  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const validation = validatePlayerName(playerName);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid name');
      return;
    }
    setError('');
    addLeaderboardEntry(difficulty, playerName, score);
    gameStore.markScoreSubmitted();
    gameStore.openLeaderboard('game-over');
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h2>Game Over</h2>
        <p className="reason">{reason}</p>
        <div className="final-score">
          Final Score: <strong>{score}</strong>
        </div>

        {isEligibleForTop10 && !alreadySubmitted && (
          <div className="top10-congrats">
            <span className="badge-new-record">🏆 TOP-10 RECORD!</span>
            <label htmlFor="player-name-input" className="name-label">
              Enter your name (2–15 chars):
            </label>
            <div className="input-row">
              <input
                type="text"
                id="player-name-input"
                className={`player-name-input ${error ? 'input-error' : ''}`}
                placeholder="AlchemistName"
                maxLength={15}
                autoComplete="off"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
              />
            </div>
            {error && (
              <div id="name-validation-error" className="name-validation-error">
                {error}
              </div>
            )}
          </div>
        )}

        {alreadySubmitted && (
          <div className="score-submitted-notice">
            <span>✅ Score saved to Leaderboard!</span>
          </div>
        )}

        {!isEligibleForTop10 && !alreadySubmitted && (
          <div className="not-top10-notice">
            <span>Brew more potions next time to enter the Top-10!</span>
          </div>
        )}

        <div className="game-over-actions">
          {isEligibleForTop10 && !alreadySubmitted && (
            <button className="submit-score-btn" id="submit-score-btn" onClick={handleSubmit}>
              Submit Score
            </button>
          )}
          <button className="play-again-btn" id="replay-btn" onClick={() => gameStore.resetGame()}>
            Replay
          </button>
          <button
            className="game-over-leaderboard-btn"
            id="game-over-leaderboard-btn"
            onClick={() => gameStore.openLeaderboard('game-over')}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}