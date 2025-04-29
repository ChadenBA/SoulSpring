import { UseFormReturn } from 'react-hook-form';
import { Media } from 'types/models/Media';
import { Quiz } from 'types/models/Quiz';

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseFormValues, undefined>;
  defaultValues?: CourseFormValues;
  isEditMode?: boolean;
}

export interface CourseFormValues {
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  subscribers?: number[];
  quiz: Quiz;
  coverMedia?: Media;
}
