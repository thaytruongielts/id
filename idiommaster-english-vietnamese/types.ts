
export interface Idiom {
  id: number;
  en: string;
  vn: string;
}

export interface Question {
  original: Idiom;
  displayParts: string[];
  missingIndex: number;
  answer: string;
}

export interface Stats {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
}

export interface AIExplanation {
  meaning: string;
  origin: string;
  example: string;
  vietnameseContext: string;
}
