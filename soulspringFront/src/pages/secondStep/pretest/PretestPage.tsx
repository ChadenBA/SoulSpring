import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, useSubmitQuizMutation } from '@redux/apis/courses/coursesApi';
import { Typography, List, ListItem, Stack, useTheme } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import CustomCheckboxButtonWithValue from '@components/Inputs/customCheckboxButton/CustomCheckboxButtonWithValue';
import Error from '@components/error/Error';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { QuizSubmission } from 'types/models/Eu';
import { useTranslation } from 'react-i18next';
import { QUIZ_FORM_CONFIG } from '@features/courses/addCourse/AddCourseForm.constants';
import { StyledQuestionsContainer } from './PrestestPage.style';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import CustomFullScreenDialog from '@components/dialogs/customFullScreenDialog/CustomFullScreenDialog';
import NoDataFound from '@components/noDataFound/NoDataFound';
import { PATHS } from '@config/constants/paths';

function PretestPage() {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId as string);

  const quizFormMethods = useForm({
    defaultValues: { answers: {} },
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const courseData = course?.data;

  const quiz = courseData?.quiz;

  const quizId = courseData?.quiz?.id;

  const [quizResults, setQuizResults] = useState<ItemDetailsResponse<QuizSubmission> | undefined>(
    undefined,
  );

  const [submitQuiz, { isLoading: isLoadingSubmission }] = useSubmitQuizMutation();

  const onSubmit = quizFormMethods.handleSubmit(async (values) => {
    try {
      const response = await submitQuiz({ quizId, data: values }).unwrap();
      setQuizResults(response);
      setOpen(true);
      dispatch(showSuccess(t('course.quiz_submitted')));
    } catch (error: any) {
      dispatch(showError(error.message));
    }
  });
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const onClose = () => {
    setOpen(false);
    setQuizResults(undefined);
    if (user?.result != null) {
      navigate(`${PATHS.COURSES.ROOT}/${courseId}`);
    } else {
      navigate(`${PATHS.SECOND_STEP.SILVERMAN_QUESTIONS}/${courseId}`);
    }
  };
  const theme = useTheme();

  if (quizResults) {
    return (
      <CustomFullScreenDialog open={open} handleClose={onClose} title={t('section.quiz.quiz')}>
        <Stack direction={'column'} spacing={4} alignItems="center" justifyContent="center">
          <Typography variant="h4" gutterBottom>
            {t('section.quiz.quiz_completed')}
          </Typography>
          <Typography variant="h6">
            {t('section.quiz.score')} {quizResults.data.score}/{quizResults.data.totalScorePossible}
          </Typography>
          <Typography variant="body1">{quizResults.data.status}</Typography>
          <CustomLoadingButton isLoading={isLoading} onClick={onClose}>
            Close
          </CustomLoadingButton>
        </Stack>
      </CustomFullScreenDialog>
    );
  }
  if (isLoading) return <FallbackLoader />;

  if (!courseData) return <NoDataFound message={t('course.not_found')} />;

  if (isError) return <Error />;

  return (
    <Stack sx={{ background: theme.palette.background.default, borderRadius: 5 }}>
      <Stack spacing={2} pl={10} pt={4} pb={2}>
        <Typography variant="h2">
          {courseData?.title} {t('common.pretest')}
        </Typography>
      </Stack>
      <Stack spacing={4} alignItems={'center'} mb={10} pb={4}>
        <FormProvider {...quizFormMethods}>
          {quiz?.questions.map((question, questionIndex) => (
            <StyledQuestionsContainer key={questionIndex}>
              <Typography variant="h5" fontWeight={'medium'}>
                {questionIndex + 1 + ')' + GLOBAL_VARIABLES.SINGLE_SPACE + question.question}
              </Typography>
              <Stack>
                <List>
                  {question.answers.length > 0 ? (
                    question.answers.map((answer, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          boxShadow: 1,
                          borderRadius: 2,
                          padding: '10px',
                          marginBottom: '10px',
                          marginTop: '10px',
                        }}
                      >
                        <CustomCheckboxButtonWithValue
                          config={{
                            ...QUIZ_FORM_CONFIG.answer,
                            name: `answers[${question.id}].answer`,
                            options: [
                              {
                                label: answer.answer,
                                value: String(answer?.id),
                              },
                            ],
                          }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <CustomRadioButton
                      config={{
                        ...QUIZ_FORM_CONFIG.answer,
                        name: `answers[${question.id}].answer`,
                        options: [
                          { label: t('common.yes'), value: 1 },
                          { label: t('common.no'), value: 0 },
                        ],
                      }}
                    />
                  )}
                </List>
              </Stack>
            </StyledQuestionsContainer>
          ))}
          <Stack maxWidth={'90%'} width={'30%'} alignItems={'center'}>
            <CustomLoadingButton isLoading={isLoadingSubmission} onClick={onSubmit}>
              {t('common.submit')}
            </CustomLoadingButton>
          </Stack>
        </FormProvider>
      </Stack>
    </Stack>
  );
}

export default PretestPage;
