export interface AnswerProps {
  euIndex: number;
  loIndex: number;
  questionIndex: number;
  answerIndex: number;
  canDelete?: boolean;
  handleRemoveAnswer: (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => void;
}
