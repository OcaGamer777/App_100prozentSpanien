export interface User {
  id: string;
  username: string;
  country: string;
  totalPoints: number;
  currentLevel: number;
  createdAt: Date;
}

export interface Question {
  id: string;
  level: number;
  type: 'multiple-choice' | 'drag-drop';
  sentence: string;
  correctAnswer: string;
  options: string[];
  translation?: string;
}

export interface UserProgress {
  userId: string;
  completedQuestions: string[];
  levelProgress: { [level: number]: number };
  unlockedLevels: number[];
}

export interface GameResult {
  questionId: string;
  timeSpent: number;
  pointsEarned: number;
  correct: boolean;
}

export interface AppSettings {
  language: 'de' | 'es';
  theme: 'light' | 'dark';
}

export interface LeaderboardEntry {
  username: string;
  country: string;
  totalPoints: number;
  rank: number;
}