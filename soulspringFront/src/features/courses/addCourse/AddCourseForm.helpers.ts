import { CourseForAdmin } from 'types/models/Course';
import { CourseFormValues } from './courseForm/CourseForm.type';
import { DEFAULT_COURSE } from './AddCourseForm.constants';

export const generateCourseFormDefaultValues = (
  valuesFromApi?: CourseForAdmin,
): CourseFormValues => {
  if (valuesFromApi) {
    return {
      title: valuesFromApi.title,
      description: valuesFromApi.description,
      categoryId: valuesFromApi.categoryId,
      subcategoryId: valuesFromApi.subcategoryId,
      quiz: valuesFromApi.quiz,
      coverMedia: valuesFromApi.coverMedia,
      subscribers: valuesFromApi.subscribers,
    };
  }

  return DEFAULT_COURSE;
};
