import { Lo } from 'types/models/Lo';

export interface CourseLearningObjectProps {
  lo: Lo;
  isEnrolled?: 0 | 1;
  passedQuizzes: number;
  index: number;
  eduUnitIndex: number;
}
