import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { CourseFormValues } from '../../CourseForm.type'

export interface QuestionPretestProps {
  field: FieldArrayWithId<CourseFormValues, 'quiz.questions', 'id'>
  questionIndex: number
  canDelete: boolean
  formMethods: UseFormReturn<CourseFormValues, any, undefined>

  handleDeleteQuestion: (questionIndex: number) => void
  handleAddQuestion: (index: number) => void
  handleAddAnswer: (questionIndex: number) => void
  handleRemoveAnswer: (questionIndex: number, answerIndex: number) => void
}
