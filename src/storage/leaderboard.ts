export interface ILeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string; // ISO 8601 string
}

export const LEADERBOARD_STORAGE_KEY = 'alchemists_cauldron_leaderboard';

/**
 * Formats a date into DD.MM.YYYY HH:MM
 * Example: 02.10.2026 12:00
 */
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

/**
 * Sorts leaderboard entries:
 * 1. Score from high to low.
 * 2. If equal score, earlier date stays higher (stable tie-breaker).
 */
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

/**
 * Reads leaderboard from localStorage safely without throwing errors.
 */
export function getLeaderboard(): ILeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortLeaderboardEntries(parsed).slice(0, 10);
  } catch (err) {
    console.error('Failed to read leaderboard from localStorage:', err);
    return [];
  }
}

/**
 * Saves entries to localStorage safely without throwing errors.
 */
export function saveLeaderboard(entries: ILeaderboardEntry[]): boolean {
  try {
    const sorted = sortLeaderboardEntries(entries).slice(0, 10);
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(sorted));
    return true;
  } catch (err) {
    console.error('Failed to save leaderboard to localStorage:', err);
    return false;
  }
}

/**
 * Clears the leaderboard in localStorage safely.
 */
export function clearLeaderboard(): boolean {
  try {
    localStorage.removeItem(LEADERBOARD_STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear leaderboard from localStorage:', err);
    return false;
  }
}

/**
 * Checks if a given score qualifies for the Top-10.
 * - If fewer than 10 entries exist, any score qualifies.
 * - If 10 entries exist, score must be strictly higher than the 10th score
 *   (since earlier scores stay higher on tie).
 */
export function isTop10Score(score: number): boolean {
  const entries = getLeaderboard();
  if (entries.length < 10) {
    return true;
  }
  const lowestScore = entries[entries.length - 1].score;
  return score > lowestScore;
}

/**
 * Validates player name according to US 1.6 rules:
 * - 2 to 15 characters
 * - allowed characters: letters, digits, space, _ and -
 */
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

/**
 * Adds an entry to the leaderboard and returns the updated Top-10.
 */
export function addLeaderboardEntry(name: string, score: number): ILeaderboardEntry[] {
  const entries = getLeaderboard();
  const newEntry: ILeaderboardEntry = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name: name.trim(),
    score,
    date: new Date().toISOString(),
  };
  entries.push(newEntry);
  const updated = sortLeaderboardEntries(entries).slice(0, 10);
  saveLeaderboard(updated);
  return updated;
}
