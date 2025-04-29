import { CourseForAdmin } from 'types/models/Course';

export interface AllCoursesListProps {
  courses?: CourseForAdmin[];
  isLoading: boolean;
  isAdmin?: boolean;
}
