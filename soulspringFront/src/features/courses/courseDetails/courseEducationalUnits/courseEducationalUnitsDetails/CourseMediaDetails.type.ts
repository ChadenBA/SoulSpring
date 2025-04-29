import { Lo } from 'types/models/Lo';

export interface CourseMediaDetailsProps {
  open: boolean;
  scroll: 'paper' | 'body' | undefined;
  onClose: () => void;
  lo: Lo;
  isEnrolled?: 0 | 1;
  currentMediaIndex: number;
}
