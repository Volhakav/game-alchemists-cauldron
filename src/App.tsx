import { useEffect } from 'react';
import { useGameStore } from './hooks/useGameStore';
import { initKeyboardHandler } from './logic/keyboard';
import Menu from './components/Menu';
import Leaderboard from './components/Leaderboard';
import GameOver from './components/GameOver';
import GameLayout from './components/GameLayout';
import PauseModal from './components/PauseModal';

export default function App() {
  const state = useGameStore();

  useEffect(() => {
    const cleanup = initKeyboardHandler();
    return cleanup;
  }, []);

  if (state.status === 'menu') return <Menu />;
  if (state.status === 'leaderboard') return <Leaderboard />;
  if (state.status === 'game-over') return <GameOver />;

  return (
    <>
      <GameLayout />
      {state.status === 'paused' && <PauseModal />}
    </>
  );
}