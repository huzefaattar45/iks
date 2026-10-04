/**
 * Lightweight game session store using localStorage.
 * Persists across page navigations within the same session.
 */

export type GameSession = {
  started: boolean;       // true only after "Begin Mission" is clicked
  startedAt: number;      // Date.now() when mission started
  endedAt: number | null; // Date.now() when mission finished (null = still running)
  hintsUsed: number;
  levelsCompleted: number;
  score: number;
  lives: number;
  maxLives: number;
};

const KEY = "cipher_vault_session";
const HINT_PENALTY = 50;
const LEVEL_BONUS = 100;
const DEFAULT_LIVES = 3;

/** An idle session — timer not yet running */
function idleSession(): GameSession {
  return {
    started: false,
    startedAt: 0,
    endedAt: null,
    hintsUsed: 0,
    levelsCompleted: 0,
    score: 0,
    lives: DEFAULT_LIVES,
    maxLives: DEFAULT_LIVES,
  };
}

export function getSession(): GameSession {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GameSession;
      if (typeof parsed.lives !== "number") parsed.lives = DEFAULT_LIVES;
      if (typeof parsed.maxLives !== "number") parsed.maxLives = DEFAULT_LIVES;
      return parsed;
    }
  } catch {}
  return idleSession();
}

export function saveSession(s: GameSession): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

function notifyUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("game_session_updated"));
  }
}

/**
 * Reset to idle — timer not started, score = 0, lives = 3.
 * Call when returning to the briefing page (Play Again / Restart Mission).
 */
export function resetSession(): void {
  saveSession(idleSession());
  notifyUpdate();
}

/**
 * Start the mission clock and initialize lives. Call when "Begin Mission" is clicked.
 * Safe to call multiple times — only resets on first call if not started.
 */
export function startSession(): void {
  const s = getSession();
  if (!s.started) {
    s.started = true;
    s.startedAt = Date.now();
    s.endedAt = null;
    s.hintsUsed = 0;
    s.levelsCompleted = 0;
    s.score = 0;
    s.lives = DEFAULT_LIVES;
    s.maxLives = DEFAULT_LIVES;
    saveSession(s);
    notifyUpdate();
  }
}

/** Call when player uses a hint — deducts points */
export function recordHint(): GameSession {
  const s = getSession();
  s.hintsUsed += 1;
  s.score = Math.max(0, s.score - HINT_PENALTY);
  saveSession(s);
  notifyUpdate();
  return s;
}

/** Call when player provides a wrong answer — deducts 1 life */
export function recordWrongAnswer(): { session: GameSession; failed: boolean } {
  const s = getSession();
  s.lives = Math.max(0, (s.lives ?? DEFAULT_LIVES) - 1);
  if (s.lives === 0 && !s.endedAt) {
    s.endedAt = Date.now();
  }
  saveSession(s);
  notifyUpdate();
  return { session: s, failed: s.lives === 0 };
}

/** Call when a level is completed — adds bonus points */
export function recordLevelComplete(): GameSession {
  const s = getSession();
  s.levelsCompleted += 1;
  s.score += LEVEL_BONUS;
  saveSession(s);
  notifyUpdate();
  return s;
}

/**
 * Freeze the timer by saving the end timestamp.
 * Call when the player reaches the success page.
 */
export function finishSession(): GameSession {
  const s = getSession();
  if (!s.endedAt) {
    s.endedAt = Date.now();
    saveSession(s);
    notifyUpdate();
  }
  return s;
}

/**
 * Returns elapsed seconds.
 * Returns 0 if the mission hasn't started yet.
 * Uses endedAt if the game is finished so the timer stays frozen.
 */
export function elapsedSeconds(): number {
  const s = getSession();
  if (!s.started) return 0;
  const end = s.endedAt ?? Date.now();
  return Math.floor((end - s.startedAt) / 1000);
}

/** Formats seconds as MM:SS */
export function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
