import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum, QuestionTypeLabelEnum } from '@config/enums/questionType.enum';

export function getQuestionTypeFilter(type: number): string {
  switch (type) {
    case QuestionTypeEnum.QCM:
      return QuestionTypeLabelEnum.QCM as string;
    case QuestionTypeEnum.BINARY:
      return QuestionTypeLabelEnum.BINARY as string;
    case QuestionTypeEnum.OPEN:
      return QuestionTypeLabelEnum.OPEN as string;
    default:
      return GLOBAL_VARIABLES.EMPTY_STRING;
  }
}

export const decodeQuestionType = (type: string): QuestionTypeEnum => {
  switch (type) {
    case 'binary':
      return QuestionTypeEnum.BINARY;
    case 'QCM':
      return QuestionTypeEnum.QCM;
    case 'open':
      return QuestionTypeEnum.OPEN;
    default:
      return QuestionTypeEnum.BINARY;
  }
};
