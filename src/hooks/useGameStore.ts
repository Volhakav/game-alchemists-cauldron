import { useState, useEffect } from 'react';
import { gameStore } from '../state/game-state';
import { IGameState } from '../data/types';

export function useGameStore(): IGameState {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = gameStore.subscribe(() => setTick((t) => t + 1));
    return unsubscribe;
  }, []);

  return gameStore.getState();
}