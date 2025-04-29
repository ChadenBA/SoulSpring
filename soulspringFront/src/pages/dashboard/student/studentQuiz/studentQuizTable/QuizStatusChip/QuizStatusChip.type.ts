import { MUIDefaultColors } from 'types/interfaces/MUI';

export interface QuizStatusProps {
  status: string;
}

export type QuizStatusColorProps = {
  label: string;
  color: MUIDefaultColors;
  background: string;
};
