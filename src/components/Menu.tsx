import { useState } from 'react';
import { gameStore } from '../state/game-state';
import { loadGame } from '../storage/save';
import type { Difficulty } from '../data/types';

export default function Menu() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [helpOpen, setHelpOpen] = useState(false);
  const hasSavedGame = loadGame() !== null;

  return (
    <div className="menu-container">
      <div className="menu-box">
        <h1>Alchemist's Cauldron</h1>
        <p>Mix ingredients, match target ranges, and brew legendary potions!</p>

        <div className="menu-actions">
          {hasSavedGame && (
            <button
              className="start-game-btn continue-btn"
              id="continue-game-btn"
              onClick={() => gameStore.continueGame()}
            >
              Continue Game
            </button>
          )}

          <div className="difficulty-select-group">
            <h3>Select Difficulty:</h3>
            <div className="diff-buttons">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  className={`diff-btn ${diff} ${selectedDifficulty === diff ? 'active' : ''}`}
                  data-diff={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            className="start-game-btn"
            id="start-game-btn"
            onClick={() => gameStore.startGame(selectedDifficulty)}
          >
            Start New Game
          </button>
          <button
            className="menu-btn leaderboard-menu-btn"
            id="menu-leaderboard-btn"
            onClick={() => gameStore.openLeaderboard('menu')}
          >
            Leaderboard
          </button>
          <button
            className="menu-btn help-btn"
            id="menu-help-btn"
            onClick={() => setHelpOpen(true)}
          >
            Help & Rules
          </button>
        </div>
      </div>

      {helpOpen && (
        <div className="help-modal-overlay" id="help-modal" style={{ display: 'flex' }}>
          <div className="help-modal-box">
            <h2>Game Rules</h2>
            <div className="help-content">
              <p>
                <strong>Goal:</strong> Add ingredients from the shelf to the cauldron to match
                target ranges.
              </p>
              <p>
                <strong>Brewing:</strong> Click <strong>Brew</strong> to check your mixture.
              </p>
            </div>
            <button className="back-btn" id="help-close-btn" onClick={() => setHelpOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}