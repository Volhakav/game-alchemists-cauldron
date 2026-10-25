import { Difficulty } from '../data/types';

export interface ILeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string;
  difficulty: Difficulty;
}

export function getLeaderboardKey(difficulty: Difficulty): string {
  return `alchemists_cauldron_leaderboard_${difficulty}`;
}

export function formatLeaderboardDate(dateInput: string | Date | number): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  } catch {
    return '';
  }
}

export function sortLeaderboardEntries(entries: ILeaderboardEntry[]): ILeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return timeA - timeB;
  });
}

export function getLeaderboard(difficulty: Difficulty = 'medium'): ILeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(getLeaderboardKey(difficulty));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortLeaderboardEntries(parsed).slice(0, 10);
  } catch (err) {
    console.error('Failed to read leaderboard from localStorage:', err);
    return [];
  }
}

export function saveLeaderboard(difficulty: Difficulty, entries: ILeaderboardEntry[]): boolean {
  try {
    const sorted = sortLeaderboardEntries(entries).slice(0, 10);
    localStorage.setItem(getLeaderboardKey(difficulty), JSON.stringify(sorted));
    return true;
  } catch (err) {
    console.error('Failed to save leaderboard to localStorage:', err);
    return false;
  }
}

export function clearLeaderboard(difficulty: Difficulty): boolean {
  try {
    localStorage.removeItem(getLeaderboardKey(difficulty));
    return true;
  } catch (err) {
    console.error('Failed to clear leaderboard from localStorage:', err);
    return false;
  }
}

export function isTop10Score(difficulty: Difficulty, score: number): boolean {
  const entries = getLeaderboard(difficulty);
  if (entries.length < 10) {
    return true;
  }
  const lowestScore = entries[entries.length - 1].score;
  return score > lowestScore;
}

export function validatePlayerName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  if (name.length > 15) {
    return { isValid: false, error: 'Name cannot exceed 15 characters' };
  }
  const allowedPattern = /^[a-zA-Z0-9 _-]+$/;
  if (!allowedPattern.test(name)) {
    return { isValid: false, error: 'Only letters, digits, spaces, _ and - are allowed' };
  }
  return { isValid: true };
}

export function addLeaderboardEntry(
  difficulty: Difficulty,
  name: string,
  score: number
): ILeaderboardEntry[] {
  const entries = getLeaderboard(difficulty);
  const newEntry: ILeaderboardEntry = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name: name.trim(),
    score,
    date: new Date().toISOString(),
    difficulty,
  };
  entries.push(newEntry);
  const updated = sortLeaderboardEntries(entries).slice(0, 10);
  saveLeaderboard(difficulty, updated);
  return updated;
}
