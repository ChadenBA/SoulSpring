import { transformPaginationResponse, transformSingleMedia } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { CourseForAdmin } from 'types/models/Course';
import { ApiPaginationResponse } from '../type';
import {
  ApiEU,
  ApiLO,
  ApiQuestion,
  CourseApi,
  EnrollCourseResponse,
  SingleCourseResponseData,
  StudentQuiz,
  StudentQuizApi,
} from './coursesApi.type';
import { toSnakeCase } from '@utils/helpers/string.helpers';

import { transformMedia } from '../transform';
import { transformDateFormat, transformDateTime } from '@utils/helpers/date.helpers';

import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
import { Question, Quiz } from 'types/models/Quiz';
import { decodeQuestionType, getQuestionTypeFilter } from '@utils/helpers/course.helpers';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { QuestionTypeEnum, QuestionTypeLabelEnum } from '@config/enums/questionType.enum';
import {
  Eu,
  QuizLoSubmission,
  QuizLoSubmissionApi,
  QuizSubmission,
  QuizSubmissionApi,
} from 'types/models/Eu';
import { Lo } from 'types/models/Lo';
import { FileWithMetadata } from '@components/Inputs/uploadMultipleFiles/UplaodMultipleFiles.type';
import { getFromLocalStorage } from '@utils/localStorage/storage';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';

export const transformFetchCoursesResponse = (
  response: ApiPaginationResponse<CourseApi>,
): PaginationResponse<CourseForAdmin> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformCourses(Object.values(response?.data)),
    };
  }
  return {
    message: response.message,
    data: transformCourses(Object.values(response?.data)),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

export const transformFetchCourseResponse = (
  response: SingleCourseResponseData,
): ItemDetailsResponse<CourseForAdmin> => {
  return {
    message: response.message,
    data: transformSingleCourse(response.data),
  };
};

export const transformCourses = (data: CourseApi[]): CourseForAdmin[] => {
  return data.map((course) => transformSingleCourse(course));
};

export const transformSingleCourse = (course: CourseApi): CourseForAdmin => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    categoryId: course.category.id,
    subcategoryId: course.subcategory.id,
    quiz: course.quiz
      ? {
          id: course.quiz.id,
          questions: course.quiz?.questions?.map((question) => ({
            id: question.id,
            question: question.question,
            type: question.type,
            isValid: question.is_valid,
            answers: question?.answers?.map((answer) => ({
              id: answer.id,
              answer: answer.answer,
              isValid: answer.is_valid,
            })),
          })),
        }
      : {
          id: 0,
          questions: [
            {
              question: GLOBAL_VARIABLES.EMPTY_STRING,
              type: QuestionTypeEnum.BINARY,
              isValid: 0,
              answers: [],
            },
          ],
        },
    passedQuizzes: course.passed_quizzes,
    educationalUnits: transformEducationalUnits(course.educational_units),
    isActive: course?.is_active ? 1 : 0,
    isOffline: course?.is_offline ? 1 : 0,
    createdAt: transformDateFormat(course.created_at),
    educationalUnitsCount: course.educational_units_count,
    learningObjectsCount: course.learning_objects_count,
    subscribedUsersCount: course.subscribed_users_count,
    coverMedia: transformSingleMedia(course.media[0]),
    isSubscribed: course.is_subscribed ? 1 : 0,
    studentLevel: course.student_level,
    category: {
      id: course.category.id,
      title: course.category.title,
    },
    subcategory: {
      id: course.subcategory.id,
      title: course.subcategory.title,
    },
  };
};

export const transformEducationalUnit = (eu: ApiEU): Eu => {
  return {
    id: eu.id,
    title: eu.title,
    type: eu.type,
    learningObjects: transformLearningObjects(eu.learning_objects),
  };
};

export const transformEducationalUnits = (educationalUnits: ApiEU[]): Eu[] => {
  return educationalUnits.map((eu) => ({
    id: eu.id,
    title: eu.title,
    type: eu.type,
    learningObjects: transformLearningObjects(eu.learning_objects),
  }));
};

export const transformLearningObjects = (learningObjects: ApiLO[]): Lo[] => {
  return learningObjects.map((lo) => ({
    id: lo.id,
    title: lo.title,
    type: lo.type,
    media: transformMedia(lo.media),
    quiz: lo.quiz
      ? {
          id: lo.quiz.id,
          isPassed: lo.quiz.is_passed,
          questions: lo.quiz.questions.map((question) => ({
            id: question.id,
            question: question.question,
            type: question.type,
            isValid: question.is_valid,
            answers: question.answers.map((answer) => ({
              id: answer.id,
              answer: answer.answer,
              isValid: answer.is_valid,
            })),
          })),
        }
      : {
          id: 0,
          questions: [
            {
              question: GLOBAL_VARIABLES.EMPTY_STRING,
              type: QuestionTypeEnum.BINARY,
              isValid: 0,
              answers: [],
            },
          ],
        },
  }));
};

//   return {
//     title: loApi.title,
//     type: loApi.type,
//     id: loApi.id,
//     media: loApi.media
//       ? loApi.media.map((media) => ({
//           id: media.id,
//           fileName: media.file_name,
//           mimeType: media.mime_type,
//           modelId: media.model_id,
//           title: GLOBAL_VARIABLES.EMPTY_STRING,
//         }))
//       : [],

//     quiz:
//       loApi?.quiz?.questions?.length > 0
//         ? {
//             id: loApi.quiz.id,
//             questions:
//               loApi.quiz.questions.length > 0
//                 ? loApi.quiz.questions.map((question) => transformQuestionSection(question))
//                 : [],
//           }
//         : {
//             id: 0,
//             questions: [
//               {
//                 question: GLOBAL_VARIABLES.EMPTY_STRING,
//                 type: QuestionTypeEnum.BINARY,
//                 isValid: 0,
//                 answers: [],
//               },
//             ],
//           },
//   };
// };

export const transformQuestionSection = (questionApi: ApiQuestion): Question => {
  const { id, is_valid, question, type, answers } = questionApi;

  return {
    id: id,
    type: decodeQuestionType(type.toString()),
    question: question,
    isValid: is_valid,
    answers:
      answers.length > 0
        ? answers.map((answer) => ({
            id: answer.id,
            answer: answer.answer,
            isValid: answer.is_valid,
          }))
        : [
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
          ],
  };
};

export const encodeCourse = (values: FieldValues): FormData => {
  const formData = new FormData();
  const { quiz, courseMedia } = values;

  Object.keys(values).forEach((key) => {
    if (key !== 'courseMedia' && key !== 'quiz') {
      formData.append(toSnakeCase(key), values[key]);
    }
  });
  if (courseMedia) {
    formData.append('course_media', courseMedia);
  }

  if (quiz?.questions?.length > 0) {
    (quiz as Quiz).questions.forEach((question, questionIndex) => {
      formData.append(`quiz[questions][${questionIndex}][question]`, question.question);

      if (question.type === QuestionTypeEnum.QCM) {
        formData.append(`quiz[questions][${questionIndex}][type]`, QuestionTypeLabelEnum.QCM);
      } else {
        formData.append(`quiz[questions][${questionIndex}][type]`, QuestionTypeLabelEnum.BINARY);
      }

      formData.append(
        `quiz[questions][${questionIndex}][id]`,
        question.id ? String(question.id) : '0',
      );

      if (question.type === QuestionTypeEnum.BINARY) {
        formData.append(`quiz[questions][${questionIndex}][is_valid]`, String(question.isValid));
      } else {
        formData.append(`quiz[questions][${questionIndex}][is_valid]`, String(question.isValid));
      }

      if (
        question.type === QuestionTypeEnum.QCM &&
        question.answers &&
        question.answers.length > 0
      ) {
        question.answers.forEach((answer, answerIndex) => {
          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][answer]`,
            answer.answer,
          );

          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
            String(answer.isValid ? '1' : '0'),
          );

          formData.append(
            `quiz[questions][${questionIndex}][answers][${answerIndex}][id]`,
            String(answer.id),
          );
        });
      }
    });
  }

  if (quiz?.deletedQuestions?.forEach) {
    quiz.deletedQuestions.forEach((questionId: number, questionIndex: number) => {
      formData.append(`quiz[deleted_questions][${questionIndex}]`, String(questionId));
    });
  }

  return formData;
};

export const encodeEu = (
  eu: Eu[],
  files: Record<number, Record<number, FileWithMetadata[]>>,
  id?: number,
  deletedMedia?: string[],
): FormData => {
  const formData = new FormData();
  eu.forEach((unit, euIndex) => {
    formData.append(`eu[${euIndex}][title]`, unit.title);
    formData.append(`eu[${euIndex}][type]`, unit.type.toUpperCase());

    unit.learningObjects.forEach((lo, loIndex) => {
      formData.append(`eu[${euIndex}][learningObjects][${loIndex}][title]`, lo.title);
      formData.append(`eu[${euIndex}][learningObjects][${loIndex}][type]`, lo.type);
      lo.id &&
        lo.id > 0 &&
        formData.append(`eu[${euIndex}][learningObjects][${loIndex}][id]`, lo.id.toString());

      if (lo.quiz.questions.length > 0) {
        lo.quiz.questions.forEach((question, questionIndex) => {
          if (!question.id || question.id == 0) {
            formData.append(
              `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][question]`,
              question.question,
            );

            question.id &&
              question.id > 0 &&
              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][type]`,
                getQuestionTypeFilter(question.type as number),
              );

            if (Number(question.type) === QuestionTypeEnum.BINARY) {
              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][is_valid]`,
                String(question.isValid),
              );

              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][type]`,
                'BINARY',
              );
            }

            if (question.answers.length > 0 && question.type === QuestionTypeEnum.QCM) {
              question.answers.forEach((answer, answerIndex) => {
                formData.append(
                  `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][answers][${answerIndex}][answer]`,
                  answer.answer,
                );

                formData.append(
                  `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][answers][${answerIndex}][is_valid]`,
                  String(answer.isValid ? '1' : '0'),
                );

                formData.append(
                  `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][type]`,
                  'QCM',
                );
                // formData.append(
                //   `eu[${euIndex}][learningObjects][${loIndex}][quiz][questions][${questionIndex}][answers][${answerIndex}][id]`,
                //   String(answer.id),
                // );
              });
            }
          }
        });
      }

      if (files[euIndex] && files[euIndex][loIndex]) {
        files[euIndex][loIndex].forEach((file, fileIndex) => {
          if (!file['metadata']['isSupplementary'] && !('fileName' in file['file']))
            formData.append(
              `eu[${euIndex}][learningObjects][${loIndex}][media_files][${fileIndex}]`,
              file['file'],
            );
          else
            !('fileName' in file['file']) &&
              formData.append(
                `eu[${euIndex}][learningObjects][${loIndex}][supplementary_files][${fileIndex}]`,
                file['file'],
              );
        });
      }
    });

    if (deletedMedia && deletedMedia.length > 0) {
      deletedMedia.forEach((mediaId, index) => {
        formData.append(`eu[${euIndex}][deleted_media][${index}]`, mediaId);
      });
    }
  });

  const temporaryIds = getFromLocalStorage(LocalStorageKeysEnum.TemporaryIds, true) ?? {};
  const currentTemporaryIds = temporaryIds[id ?? 0];

  currentTemporaryIds.forEach((tempsId: any, index: number) => {
    formData.append(
      `eu[${tempsId.euIndex}][learningObjects][${tempsId.loIndex}][temporary_ids][${index}]`,
      tempsId.temporaryId,
    );
  });

  return formData;
};
interface QuizAnswer {
  answer: number[] | number;
}
export const encodeQuizSubmission = (data: FieldValues): FormData => {
  const formData = new FormData();
  Object.entries(data.answers).forEach(([questionId, answerData], index) => {
    const typedAnswerData = answerData as QuizAnswer;

    // Always append the question_id
    formData.append(`answers[${index}][question_id]`, questionId);

    // Check if answer is an array and append each item individually
    if (Array.isArray(typedAnswerData.answer)) {
      typedAnswerData.answer.forEach((answerId) => {
        formData.append(`answers[${index}][answer][]`, `${answerId}`);
      });
    } else {
      // For single answers, just append the value
      formData.append(`answers[${index}][answer][]`, `${typedAnswerData.answer}`);
    }
  });
  return formData;
};
export const transformQuizScores = (data: StudentQuizApi[]): StudentQuiz[] => {
  return data.map((data) => ({
    id: data.id,
    score: data.score,
    totalScorePossible: data.total_score_possible,
    status: data.status,
    createAt: transformDateTime(data.created_at),
    quiz: {
      id: data.quiz.id,
      course: {
        id: data?.quiz?.course?.id || 0,
        title: data?.quiz?.course?.title || GLOBAL_VARIABLES.EMPTY_STRING,
      },
    },
  }));
};
export const transformQuizScoreResponse = (
  data: ApiPaginationResponse<StudentQuizApi>,
): PaginationResponse<StudentQuiz> => {
  return {
    message: data.message,
    data: transformQuizScores(data.data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

export const transformQuizSubmissionResponse = (
  data: ItemDetailsResponse<QuizSubmissionApi>,
): ItemDetailsResponse<QuizSubmission> => {
  return {
    message: data.message,
    data: {
      score: data.data.score,
      totalScorePossible: data.data.total_score_possible,
      status: data.data.status,
    },
  };
};

export const transformLoQuizSubmissionResponse = (
  data: ItemDetailsResponse<QuizLoSubmissionApi>,
): ItemDetailsResponse<QuizLoSubmission> => {
  return {
    message: data.message,
    data: {
      score: data.data.score,
      totalScorePossible: data.data.total_score_possible,
      passed: data.data.passed,
    },
  };
};

export interface EnrollCourseResponseApi {
  courses_count: number;
  latest_course_id: number;
}
export const transformEnrollCourseResponse = (
  data: EnrollCourseResponseApi,
): EnrollCourseResponse => {
  return {
    data: {
      coursesCount: data.courses_count,
      latestCourseId: data.latest_course_id,
    },
  };
};
