import { useGameStore } from '../hooks/useGameStore';
import { gameStore } from '../state/game-state';
import { formatTime } from '../logic/time';
import Shelf from './Shelf';
import Cauldron from './Cauldron';
import RecipePanel from './RecipePanel';
import Bars from './Bars';

export default function GameLayout() {
  const state = useGameStore();
  const isPaused = state.status === 'paused';

  const livesStr = '❤️'.repeat(Math.max(0, state.lives));
  const formatted = formatTime(state.timeLeft);
  const timerPercent = (state.timeLeft / 150) * 100;
  const lowTime = state.timeLeft <= 15;

  return (
    <div className={`game-container ${isPaused ? 'blurred' : ''}`}>
      <header className="game-header">
        <div className="header-top">
          <h1>Alchemist's Cauldron</h1>
          <button
            className="pause-btn"
            id="pause-trigger-btn"
            title="Pause"
            onClick={() => gameStore.pauseGame()}
          >
            ⏸
          </button>
        </div>
        <div className="game-stats">
          <span>
            Score: <strong id="score-text">{state.score}</strong>
          </span>
          <span>
            Lives: <strong id="lives-text">{livesStr}</strong>
          </span>
          <div className="timer-wrapper">
            <span>
              Time: <strong id="timer-text" className={lowTime ? 'pulse-red' : ''}>
                {formatted}
              </strong>
            </span>
            <div className="timer-bar-container">
              <div
                className={`timer-bar-fill ${lowTime ? 'pulse-bar' : ''}`}
                id="timer-bar"
                style={{ width: `${timerPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="game-main">
        <aside id="shelf-container">
          <Shelf />
        </aside>
        <section id="cauldron-container">
          <Cauldron />
        </section>
        <aside id="recipe-container">
          <RecipePanel />
        </aside>
        <aside id="bars-container">
          <Bars />
        </aside>
      </main>
    </div>
  );
}