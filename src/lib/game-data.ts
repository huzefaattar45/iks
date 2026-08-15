export type LevelStatus = "completed" | "available" | "locked";

export type LevelMeta = {
  id: number;
  code: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  difficulty: number;
  status: LevelStatus;
  icon: "clock" | "calendar" | "signal" | "lock" | "key";
};

export const LEVELS: LevelMeta[] = [
  {
    id: 1,
    code: "01",
    title: "THE TIME LOCK",
    shortTitle: "Clock",
    badge: "MODULO 12",
    description: "The vault clock has shifted. Calculate its next position using modular arithmetic.",
    difficulty: 1,
    status: "available",
    icon: "clock",
  },
  {
    id: 2,
    code: "02",
    title: "THE CALENDAR LOCK",
    shortTitle: "Calendar",
    badge: "MODULO 7",
    description: "Seven-day cycles guard the second seal. Predict the activation weekday.",
    difficulty: 2,
    status: "locked",
    icon: "calendar",
  },
  {
    id: 3,
    code: "03",
    title: "THE RECURRING SIGNAL",
    shortTitle: "Events",
    badge: "CYCLIC SCHEDULING",
    description: "A repeating scan pulses through the vault. Track where the cycle lands.",
    difficulty: 3,
    status: "locked",
    icon: "signal",
  },
  {
    id: 4,
    code: "04",
    title: "THE ENCRYPTION CHAMBER",
    shortTitle: "Encrypt",
    badge: "MODULO 26",
    description: "Rotate the alphabet ring and seal your message inside the cipher.",
    difficulty: 4,
    status: "locked",
    icon: "lock",
  },
  {
    id: 5,
    code: "05",
    title: "THE DECRYPTION CORE",
    shortTitle: "Decrypt",
    badge: "FINAL SECURITY LAYER",
    description: "Reverse the cipher and recover the intercepted transmission.",
    difficulty: 5,
    status: "locked",
    icon: "key",
  },
];

export const BRIEFING_LAYERS = [
  { code: "01", name: "CLOCK LOCK", mechanism: "Modulo 12" },
  { code: "02", name: "CALENDAR LOCK", mechanism: "Modulo 7" },
  { code: "03", name: "RECURRING EVENT", mechanism: "Cyclic Scheduling" },
  { code: "04", name: "ENCRYPTION CHAMBER", mechanism: "Modulo 26" },
  { code: "05", name: "DECRYPTION CORE", mechanism: "Cipher Logic" },
];

export const PLAYER = {
  name: "Guest Player",
  status: "MISSION ACTIVE",
  time: "04:37",
  lives: 3,
  score: 920,
  hints: 1,
  currentLevel: 1,
  totalLevels: 5,
};

export const RECENT_ACTIVITY = [
  { type: "success" as const, text: "Level 1 unlocked" },
  { type: "success" as const, text: "Clock puzzle solved" },
  { type: "warning" as const, text: "Level 2 awaiting completion" },
];

export const LEADERBOARD = [
  { rank: "01", player: "CipherFox", time: "03:42", score: 980, hints: 0 },
  { rank: "02", player: "Nova", time: "04:17", score: 945, hints: 1 },
  { rank: "03", player: "ByteGhost", time: "04:37", score: 920, hints: 1, isCurrent: true },
  { rank: "04", player: "Zeroth", time: "05:02", score: 880, hints: 2 },
  { rank: "05", player: "M0DULUS", time: "05:44", score: 845, hints: 2 },
];

export const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const SOLUTION_LOG = [
  {
    code: "LEVEL 01",
    title: "CLOCK",
    problem: "9 + 17 hours on a 12-hour dial",
    steps: ["17 mod 12 = 5", "9 + 5 = 14", "14 mod 12 = 2"],
    answer: "2",
  },
  {
    code: "LEVEL 02",
    title: "CALENDAR",
    problem: "Monday + 45 days",
    steps: ["45 mod 7 = 3", "Monday + 3 = Thursday"],
    answer: "THURSDAY",
  },
  {
    code: "LEVEL 03",
    title: "RECURRING EVENT",
    problem: "Every 10 days starting Friday, 4th scan",
    steps: ["10 mod 7 = 3", "Each event shifts by 3 weekdays", "Friday → Monday → Thursday → Sunday"],
    answer: "SUNDAY",
  },
  {
    code: "LEVEL 04",
    title: "ENCRYPTION",
    problem: "HELLO with key 3",
    steps: ["H = 7", "(7 + 3) mod 26 = 10", "10 = K", "E → H, L → O, L → O, O → R"],
    answer: "KHOOR",
  },
  {
    code: "LEVEL 05",
    title: "DECRYPTION",
    problem: "FRPSXWHU with key 3",
    steps: ["P = (C − K + 26) mod 26", "F → C, R → O, P → M, S → P", "X → U, W → T, H → E, U → R"],
    answer: "COMPUTER",
  },
];

/** Mock helpers — replace with real game engine later. */
export const shiftLetter = (ch: string, key: number) => {
  const i = ALPHABET.indexOf(ch.toUpperCase());
  if (i === -1) return ch;
  return ALPHABET[(i + ((key % 26) + 26)) % 26];
};

export const caesar = (text: string, key: number) =>
  text
    .split("")
    .map((c) => shiftLetter(c, key))
    .join("");
