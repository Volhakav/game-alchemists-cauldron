import { gameStore } from '../state/game-state';

export default function PauseModal() {
  return (
    <div className="pause-overlay">
      <div className="pause-modal">
        <h2>Game Paused</h2>
        <button className="resume-btn" onClick={() => gameStore.resumeGame()}>
          Resume
        </button>
        <button className="exit-btn" onClick={() => gameStore.exitToMenu()}>
          Exit to Menu
        </button>
      </div>
    </div>
  );
}