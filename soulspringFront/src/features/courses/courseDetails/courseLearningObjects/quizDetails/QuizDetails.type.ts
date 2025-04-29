import { Lo } from 'types/models/Lo';

export interface CustomQuizDetailsProps {
  open: boolean;
  onClose: () => void;
  lo: Lo;
}
