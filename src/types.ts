export interface QuizOption {
  id: string;
  text: string;
  detail?: string;
}

export interface QuizQuestion {
  id: number;
  category: 'dr_rincon' | 'b2b' | 'b2c' | 'comparativa';
  categoryLabel: string;
  badgeColor: string;
  title: string;
  question: string;
  contextHint?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  keyTakeaway: string;
}

export interface QuizSubmission {
  id: string;
  fullName: string;
  email: string;
  commercialLine?: 'B2B' | 'B2C' | 'Ambas' | 'General';
  answers: Record<number, string>;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

export type QuizView = 'form' | 'results' | 'history';
