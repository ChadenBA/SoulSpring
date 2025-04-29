import { LearningObjectType } from '@config/enums/learningObjectType.enum';
import { Media } from './Media';
import { Quiz } from './Quiz';

export interface Lo {
  id?: number;
  title: string;
  type: LearningObjectType;
  media?: Media[];
  quiz: Quiz;
}
