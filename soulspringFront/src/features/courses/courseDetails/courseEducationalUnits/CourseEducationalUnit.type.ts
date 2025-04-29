import { Eu } from 'types/models/Eu';
import { Lo } from 'types/models/Lo';

export interface CourseEducationalUnitProps {
  eu: Eu;
  isEnrolled?: 0 | 1;
  los: Lo[];
  passedQuizzes: number;
  euIndex: number;
}
