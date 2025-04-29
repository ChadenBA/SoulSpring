import { SilvermanAnswer } from './SilvermanAnswer';
export interface SilvermanQuestion {
  id: number;
  question: string;
  created_at: string;
  updated_at: string;
  answers: SilvermanAnswer[];
}
