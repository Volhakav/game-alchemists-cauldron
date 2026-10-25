import { gameStore } from '../state/game-state';

export function initKeyboardHandler(): void {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)
    ) {
      return;
    }

    const state = gameStore.getState();

    if (state.status === 'playing') {
      if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        gameStore.pauseGame();
        return;
      }

      if (e.code === 'KeyO') {
        e.preventDefault();
        gameStore.pourOut();
        return;
      }
    } 
    else if (state.status === 'paused') {
      if (e.code === 'KeyP' || e.code === 'Escape') {
        e.preventDefault();
        gameStore.resumeGame();
        return;
      }
    }
  });
}