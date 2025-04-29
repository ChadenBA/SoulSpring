export interface CourseCardMediaProps {
  image: string;

  isEnrolled?: 0 | 1;
  handleEnroll: () => void;
}
