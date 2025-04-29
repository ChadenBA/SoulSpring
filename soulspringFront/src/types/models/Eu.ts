import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';
import { Lo } from './Lo';

export interface Eu {
  id?: number;
  euId?: number;
  title: string;
  type: EducationalUnitEnum;
  learningObjects: Lo[];
}

export interface QuizSubmissionApi {
  score: number;
  total_score_possible: number;
  status: string;
}

export interface QuizSubmission {
  score: number;
  totalScorePossible: number;
  status: string;
}

export interface QuizLoSubmissionApi {
  score: number;
  total_score_possible: number;
  passed: boolean;
}

export interface QuizLoSubmission {
  score: number;
  totalScorePossible: number;
  passed: boolean;
}
