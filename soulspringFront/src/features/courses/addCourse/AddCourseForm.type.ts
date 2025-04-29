import { CourseForAdmin } from 'types/models/Course';

export interface AddCourseFormProps {
  isEditMode: boolean;
  courseDefaultValues?: CourseForAdmin;
  id?: string;
  isFetching?: boolean;
}
