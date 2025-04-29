import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { FormValues } from '../eu/Eu.type';

export interface QuestionProps {
  field: FieldArrayWithId<FormValues, 'eu', 'id'>;
  questionIndex: number;
  euIndex: number;
  loIndex: number;

  canDelete: boolean;
  euFormMethods: UseFormReturn<FormValues, any, undefined>;

  handleDeleteQuestion: (euIndex: number, loIndex: number, questionIndex: number) => void;
  handleAddQuestion: (euIndex: number, loIndex: number) => void;
  handleAddAnswer: (euIndex: number, loIndex: number, questionIndex: number) => void;
  handleRemoveAnswer: (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => void;
}
