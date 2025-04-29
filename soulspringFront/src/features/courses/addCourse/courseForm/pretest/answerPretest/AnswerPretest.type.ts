export interface AnswerExamProps {
  questionIndex: number
  answerIndex: number
  canDelete: boolean
  handleRemoveAnswer: (questionIndex: number, answerIndex: number) => void
}
