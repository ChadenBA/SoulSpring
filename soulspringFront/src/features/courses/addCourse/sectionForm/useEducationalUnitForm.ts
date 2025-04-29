import { UseFormReturn, useFieldArray } from 'react-hook-form';

import { Eu } from 'types/models/Eu';
import { FormValues } from './eu/Eu.type';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import { LearningObjectType } from '@config/enums/learningObjectType.enum';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';

import {
  DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
  DEFAULT_ANSWER_OBJECT,
  DEFAULT_BASIC_EDUCATIONAL_UNIT,
  DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
  DEFAULT_QUESTION_OBJECT,
} from './EuForm.constants';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

interface UseSectionFormProps {
  euFormMethods: UseFormReturn<FormValues, any, undefined>;
}
export default function useEducationalUnitForm({ euFormMethods }: UseSectionFormProps) {
  // ----------------------------- Form Methods -----------------------------
  const { fields, append, insert, remove, update } = useFieldArray({
    control: euFormMethods.control,
    name: 'eu',
  });

  // Add a new educational unit to the form
  const handleAddEducationalUnit = (
    unitType: EducationalUnitEnum,
    index: number,
    isEditMode: boolean,
    title: string = GLOBAL_VARIABLES.EMPTY_STRING,
  ) => {
    const unitDefaults: { [key: string]: Eu } = {
      basic: DEFAULT_BASIC_EDUCATIONAL_UNIT,
      intermediate: DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
      advanced: DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
    };

    !isEditMode
      ? insert(index + 1, unitDefaults[(unitType as string).toLocaleLowerCase()])
      : append({ ...unitDefaults[(unitType as string).toLocaleLowerCase()], title });
  };

  // remove an educational unit from the form
  const handleRemoveEducationalUnit = (index: number) => {
    remove(index);
  };

  // Add a new question to the learning object's quiz
  const handleAddQuestion = (euIndex: number, loIndex: number) => {
    const questionDefaults = DEFAULT_QUESTION_OBJECT;
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: [...lo.quiz.questions, questionDefaults],
              },
            }
          : lo,
      ),
    });
  };

  const handleRemoveQuestion = (euIndex: number, loIndex: number, questionIndex: number) => {
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.filter((_, i) => i !== questionIndex),
              },
            }
          : lo,
      ),
    });
  };

  // Add an answer to a question within a learning object
  const handleAddAnswer = (euIndex: number, loIndex: number, questionIndex: number) => {
    const answerDefaults = DEFAULT_ANSWER_OBJECT;
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.map((question, qIndex) =>
                  qIndex === questionIndex
                    ? {
                        ...question,
                        answers: [...question.answers, answerDefaults],
                      }
                    : question,
                ),
              },
            }
          : lo,
      ),
    });
  };

  // Remove an answer from a question within a learning object's quiz
  const handleRemoveAnswer = (
    euIndex: number,
    loIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => {
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: fields[euIndex].learningObjects.map((lo, index) =>
        index === loIndex
          ? {
              ...lo,
              quiz: {
                ...lo.quiz,
                questions: lo.quiz.questions.map((question, qIndex) =>
                  qIndex === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.filter((_, i) => i !== answerIndex),
                      }
                    : question,
                ),
              },
            }
          : lo,
      ),
    });
  };

  const handleAddLearningObject = (euIndex: number) => {
    update(euIndex, {
      ...fields[euIndex],
      learningObjects: [
        ...fields[euIndex].learningObjects,
        {
          title: '',
          type: LearningObjectType.ABSTRACT,
          quiz: {
            questions: [
              {
                question: '',
                type: QuestionTypeEnum.BINARY,
                isValid: 0,
                answers: [
                  {
                    answer: '',
                    isValid: 0,
                  },
                  {
                    answer: '',
                    isValid: 0,
                  },
                ],
              },
            ],
          },
          id: 0,
        },
      ],
    });
  };

  return {
    fields,
    handleAddEducationalUnit,
    handleRemoveEducationalUnit,
    handleAddQuestion,
    handleRemoveQuestion,
    handleRemoveAnswer,
    handleAddAnswer,
    handleAddLearningObject,
    euFormMethods,
  };
}
