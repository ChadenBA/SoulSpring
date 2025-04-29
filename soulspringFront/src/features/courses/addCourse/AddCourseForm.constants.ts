import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { CourseFormValues } from './courseForm/CourseForm.type';
import { Step } from '@components/CustomStepper/CustomStepper.type';

export const STEPS: Step[] = [
  {
    label: 'course.create_course',
    icon: null,
  },
  {
    label: 'course.create_eu',
    icon: null,
  },
];

export const DEFAULT_COURSE: CourseFormValues = {
  title: GLOBAL_VARIABLES.EMPTY_STRING,
  description: GLOBAL_VARIABLES.EMPTY_STRING,
  categoryId: 0,
  subcategoryId: 0,
  quiz: {
    questions: [
      {
        question: GLOBAL_VARIABLES.EMPTY_STRING,
        type: QuestionTypeEnum.BINARY,
        isValid: 0,
        answers: [
          {
            answer: GLOBAL_VARIABLES.EMPTY_STRING,
            isValid: 0,
          },
          {
            answer: GLOBAL_VARIABLES.EMPTY_STRING,
            isValid: 0,
          },
        ],
      },
    ],
  },
};

export const QUIZ_FORM_CONFIG = {
  answer: {
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
};
