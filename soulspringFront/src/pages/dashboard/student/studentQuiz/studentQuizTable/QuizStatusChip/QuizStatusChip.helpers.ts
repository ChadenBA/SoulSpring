import { LIGHT_COLORS } from '@config/colors/colors';
import { QuizStatusColorProps } from './QuizStatusChip.type';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

export const getQuizStatusChipColor = (status: string | undefined): QuizStatusColorProps => {
  let quizStatusColor: QuizStatusColorProps = {
    label: status || GLOBAL_VARIABLES.EMPTY_STRING,
    color: 'primary',
    background: LIGHT_COLORS.primary.light,
  };
  switch (status) {
    case 'Beginner':
      quizStatusColor = {
        ...quizStatusColor,
        color: 'success',
        background: '#D0FFE1',
      };
      break;

    case 'Intermediate':
      quizStatusColor = {
        ...quizStatusColor,
        color: 'error',
        background: '#FFF0F3',
      };
      break;
    case 'Advanced':
      quizStatusColor = {
        ...quizStatusColor,
        color: 'warning',
        background: '#FFF7D0',
      };
      break;

    default:
      quizStatusColor = {
        ...quizStatusColor,
        color: 'primary',
        background: LIGHT_COLORS.primary.light,
      };
  }
  return quizStatusColor;
};
