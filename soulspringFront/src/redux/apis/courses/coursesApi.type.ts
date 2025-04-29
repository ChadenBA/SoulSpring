import { MediaApi } from 'types/models/Media';
import { UserApi } from '../user/usersApi.type';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';
import { LearningObjectType } from '@config/enums/learningObjectType.enum';
import { QuizApi } from 'types/models/Quiz';

export interface CourseApi {
  id: number;
  title: string;
  category_id: number;
  category: {
    id: number;
    title: string;
  };
  passed_quizzes: number;
  subcategory_id: number;
  subcategory: {
    id: number;
    title: string;
  };
  description: string;
  is_active?: 0 | 1;
  is_offline?: 0 | 1;
  is_subscribed?: 0 | 1;
  created_at: number;
  media: MediaApi[];

  learning_objects_count: number;
  educational_units_count: number;
  subscribed_users_count: number;
  educational_units: ApiEU[];
  quiz: QuizApi;
  student_level?: string;
}
export interface SingleCourseResponseData {
  data: CourseApi;
  message: string;
}

export interface CreateCourseResponse {
  message: string;
  data: CourseApi;
}

export interface GetCourseForAdminResponse {
  message: string;
  data: {};
}

export interface CourseForAdminApi {
  id: number;
  title: string;
  description: string;
  category_id: number;
  subcategory_id: number;
  is_active?: 0 | 1;
  is_offline?: 0 | 1;
  subscribers: UserApi[];
  created_at: string;
  media: MediaApi[];
  educational_units: ApiEU[];
  quiz: QuizApi;
}

export interface ApiEU {
  id?: number;
  title: string;
  type: EducationalUnitEnum;
  learning_objects: ApiLO[];
}

export interface ApiLO {
  id: number;
  title: string;
  type: LearningObjectType;
  media: MediaApi[];
  quiz: {
    id: number;
    questions: ApiQuestion[];
    is_passed: boolean;
  };
}

export interface ApiQuestion {
  id: number;
  question: string;
  type: QuestionTypeEnum;
  is_valid: 0 | 1;
  answers: ApiAnswer[];
}

export interface ApiAnswer {
  id: number;
  answer: string;
  is_valid: 0 | 1;
}
export interface StudentQuiz {
  id: number;
  score: number;
  totalScorePossible: number;
  status: string;
  createAt: string;
  quiz: {
    id: number;
    course?: {
      id: number;
      title: string;
    };
  };
}

export interface StudentQuizApi {
  id: number;
  score: number;
  total_score_possible: number;
  status: string;
  created_at: string;
  quiz: {
    id: number;
    course?: {
      id: number;
      title: string;
    };
  };
}
export interface EnrollCourseResponse {
  data: {
    coursesCount: number;
    latestCourseId: number;
  };
}
