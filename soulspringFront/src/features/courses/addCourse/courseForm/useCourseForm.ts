import usePagination from 'src/hooks/usePagination';
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { CourseFormValues } from './CourseForm.type';
import { useState, useEffect } from 'react';
import { DEFAULT_ANSWER_OBJECT, DEFAULT_QUESTION_OBJECT } from '../sectionForm/EuForm.constants';

interface UseCourseForm {
  formMethods: UseFormReturn<CourseFormValues, any, undefined>;
}

export default function useCourseForm({ formMethods }: UseCourseForm) {
  const { watch, setValue } = formMethods;

  const {
    fields: questions,
    append,
    update,
  } = useFieldArray({
    control: formMethods.control,
    name: 'quiz.questions',
  });

  // Initialize the usePagination hook
  const { queryParams } = usePagination();

  const [subCategoriesOption, setSubCategoriesOption] = useState<
    { label: string; value: number }[]
  >([]);

  // Get the data from the useQuery hook
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetCategoriesQuery({
    ...queryParams,
    pagination: false,
  });

  const selectedCategory = watch('categoryId');

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = categoriesData?.data.find((cat) => cat.id === selectedCategory);

      if (selectedCategoryData) {
        setSubCategoriesOption(
          selectedCategoryData.children.map((subCat) => ({
            label: subCat.title,
            value: subCat.id,
          })),
        );
      }
    }
  }, [selectedCategory, categoriesData]);

  const categoryOptions = categoriesData?.data.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  //_________________________ Quiz Section ___________________________ //

  const handleRemoveQuestion = (questionIndex: number) => {
    const questionsToUpdate = formMethods.watch('quiz.questions');

    // This will update the questions array, removing the selected question
    const updatedQuestions = [
      ...questionsToUpdate.slice(0, questionIndex),
      ...questionsToUpdate.slice(questionIndex + 1),
    ];

    setValue('quiz.questions', updatedQuestions);

    // Ensure we use an empty array if currentDeletedQuestions is undefined
    const currentDeletedQuestions = formMethods.watch('quiz.deletedQuestions') ?? [];

    // Add the deleted question's ID to the deletedQuestions array only if it is defined
    const deletedQuestionId = questionsToUpdate[questionIndex]?.id;
    if (deletedQuestionId !== undefined) {
      setValue('quiz.deletedQuestions', [...currentDeletedQuestions, deletedQuestionId]);
    }
  };

  const handleAddAnswer = (questionIndex: number) => {
    const fieldToUpdate = formMethods.watch('quiz.questions');
    const updatedAnswers = [...fieldToUpdate[questionIndex].answers, DEFAULT_ANSWER_OBJECT];
    update(questionIndex, {
      ...fieldToUpdate[questionIndex],
      answers: updatedAnswers,
    });
  };

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    const fieldToUpdate = formMethods.watch('quiz.questions');
    const updatedAnswers = [
      ...fieldToUpdate[questionIndex].answers.slice(0, answerIndex),
      ...fieldToUpdate[questionIndex].answers.slice(answerIndex + 1),
    ];

    update(questionIndex, {
      ...fieldToUpdate[questionIndex],
      answers: updatedAnswers,
    });
  };
  const handleAddQuestion = () => {
    append(DEFAULT_QUESTION_OBJECT);
  };

  return {
    isLoadingData: isLoadingCategories || isFetchingCategories,
    categoryOptions,
    selectedCategory,
    subCategoriesOption,
    questions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleRemoveAnswer,
    handleAddAnswer,
  };
}
