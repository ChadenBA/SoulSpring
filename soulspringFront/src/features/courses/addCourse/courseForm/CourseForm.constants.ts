import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { LearningObjectType } from '@config/enums/learningObjectType.enum';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { InputConfig, InputOption } from 'types/interfaces/InputConfig';

export const BOOLEAN_OPTIONS: InputOption[] = [
  { label: 'common.yes', value: 1 },
  { label: 'common.no', value: 0 },
];

export const TRUE_FALSE_OPTIONS: InputOption[] = [
  { label: 'common.true', value: 1 },
  { label: 'common.false', value: 0 },
];

export const QUESTION_TYPES = [
  { label: 'section.quiz.question_qcm', value: QuestionTypeEnum.QCM },
  { label: 'section.quiz.question_binary', value: QuestionTypeEnum.BINARY },
];

export const CREATE_COURSE_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: 'course.title_placeholder',
    label: 'course.title',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.title_required' },
  },
  description: {
    name: 'description',
    placeholder: 'course.description_placeholder',
    label: 'course.description',
    type: 'textarea',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.description_required' },
  },
  categoryId: {
    name: 'categoryId',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.category_label',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'category.category_required',
    },
  },
  subcategoryId: {
    name: 'subcategoryId',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'category.sub_category_label',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'category.sub_category_required',
    },
  },
  questionTitle: {
    name: 'questionTitle',
    placeholder: 'section.quiz.question_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.quiz.question_required' },
  },
  questionType: {
    name: 'questionType',
    placeholder: 'section.quiz.question_type_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    options: QUESTION_TYPES,
    defaultValue: QuestionTypeEnum.BINARY,
    rules: { required: 'section.quiz.type_required' },
  },
  questionIsValid: {
    name: 'questionIsValid',
    defaultValue: 0,
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: TRUE_FALSE_OPTIONS,
    rules: {
      required: 'section.quiz.questionIsValid_required',
    },
  },
  answerTitle: {
    name: 'answerText',
    placeholder: 'section.quiz.answer_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.quiz.answer_required' },
  },
  answerIsValid: {
    name: 'answerIsValid',
    defaultValue: 0,
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: [
      {
        label: GLOBAL_VARIABLES.EMPTY_STRING,
        value: 0,
      },
    ],
  },
  euTitle: {
    name: 'euTitle',
    placeholder: 'course.eu_title_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.eu_title_required' },
  },
  loType: {
    name: 'loType',
    defaultValue: 0,
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: [
      {
        label: 'course.lo_object_type_abstract',
        value: LearningObjectType.ABSTRACT,
      },
      {
        label: 'course.lo_object_type_concrete',
        value: LearningObjectType.CONCRETE,
      },
    ],
  },
};
