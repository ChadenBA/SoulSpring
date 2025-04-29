import { Media } from './Media';
import { Eu } from './Eu';
import { Quiz } from './Quiz';

export interface Course {
  coverMedia: Media;
  id: number;
  title: string;
  categoryId: number;
  category: {
    id: number;
    category: string;
  };
  subcategoryId: number;
  subcategory: {
    id: number;
    subcategory: string;
  };
  description: string;
  isActive?: boolean;
  isOffline?: boolean;
  isSubscribed?: 0 | 1;
  createdAt: string;
  media: Media[];
  learningObjectsCount: number;
  educationalUnitsCount: number;
  subscribedUsersCount: number;
  educationalUnits: Eu[];
  quiz: Quiz;
}

export interface CourseForAdmin {
  id: number;
  image:string;
  name:string;
  lastename:string;
  address:string;
  specialite:string;
  email:string;
  // title: string;
  // description: string;
  // categoryId: number;
  // category?: {
  //   id: number;
  //   title: string;
  // };
  // subcategory?: {
  //   id: number;
  //   title: string;
  // };
  // subcategoryId: number;
  // isOffline?: 1 | 0;
  // isActive?: 1 | 0;
  // subscribers?: number[];
  // educationalUnits: Eu[];
  // educationalUnitsCount?: number;
  // learningObjectsCount?: number;
  // subscribedUsersCount?: number;
  // quiz: Quiz;
  // courseMedia?: File;
  // createdAt: string;
  // media?: Record<string, Record<number, File[]>>;
  // coverMedia: Media;
  // isSubscribed?: 0 | 1;
  // studentLevel?: string;
  // passedQuizzes: number;
}
