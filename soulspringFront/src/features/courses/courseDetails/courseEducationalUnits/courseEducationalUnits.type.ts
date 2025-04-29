import { Eu } from 'types/models/Eu';

export interface CourseContentProps {
  eus: Eu[];
  isEnrolled?: 0 | 1;
  passedQuizzes: number;
}
