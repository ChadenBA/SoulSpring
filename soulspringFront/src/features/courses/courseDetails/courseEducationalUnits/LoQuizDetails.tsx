import CustomFullScreenDialog from '@components/dialogs/customFullScreenDialog/CustomFullScreenDialog';
import { CustomQuizDetailsProps } from './LoQuizDetails.type';
import {
  List,
  ListItem,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { QUIZ_FORM_CONFIG } from './LoQuizDetails.constants';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import { useTranslation } from 'react-i18next';
import CustomCheckboxButtonWithValue from '@components/Inputs/customCheckboxButton/CustomCheckboxButtonWithValue';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import { useAppDispatch } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import { useState } from 'react';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { courseApi, useSubmitLoQuizMutation } from '@redux/apis/courses/coursesApi';
import { QuizLoSubmission } from 'types/models/Eu';

function LoQuizDetails({ onClose, open, lo }: CustomQuizDetailsProps) {
  const quizFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const { t } = useTranslation();

  const quiz = lo?.quiz;

  const dispatch = useAppDispatch();

  const quizId = lo.quiz?.id;

  const [quizResults, setQuizResults] = useState<ItemDetailsResponse<QuizLoSubmission> | undefined>(
    undefined,
  );

  const [activeStep, setActiveStep] = useState(0);

  const [submitQuiz, { isLoading }] = useSubmitLoQuizMutation();

  const onSubmit = quizFormMethods.handleSubmit(async (values) => {
    try {
      const response = await submitQuiz({ quizId, data: values }).unwrap();
      setQuizResults(response);
      dispatch(courseApi.util.invalidateTags(['Course', 'Courses']));
      dispatch(showSuccess(t('course.quiz_submitted')));
    } catch (error) {
      dispatch(showError(t('common.error')));
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
          <Typography variant="body1">
            {quizResults.data.passed ? t('section.quiz.passed') : t('section.quiz.failed')}
          </Typography>
          <CustomLoadingButton isLoading={isLoading} onClick={onClose}>
            Close
          </CustomLoadingButton>
        </Stack>
      </CustomFullScreenDialog>
    );
  }

  return (
    <CustomFullScreenDialog open={open} handleClose={onClose} title={t('section.quiz.quiz')}>
      <FormProvider {...quizFormMethods}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {quiz?.questions &&
            quiz?.questions.map((question, questionIndex) => (
              <Step key={questionIndex}>
                <StepLabel>
                  <Typography fontWeight={'medium'} fontSize={'20px'}>
                    {question.question}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <List>
                    {question.answers.length > 0 ? (
                      question.answers.map((answer, answerIndex) => (
                        <ListItem key={answerIndex}>
                          <Stack direction={'row'} alignItems={'center'} padding={1} spacing={2}>
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
                          </Stack>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <Stack alignItems={'center'} padding={1} spacing={2}>
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
                        </Stack>
                      </ListItem>
                    )}
                  </List>
                  <Stack direction="row" spacing={2}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      {t('common.back')}
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                      {activeStep === quiz.questions.length - 1
                        ? t('common.submit')
                        : t('common.next')}
                    </Button>
                  </Stack>
                </StepContent>
              </Step>
            ))}
        </Stepper>
        {activeStep === quiz.questions.length && (
          <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
            {t('common.submit')}
          </CustomLoadingButton>
        )}
      </FormProvider>
    </CustomFullScreenDialog>
  );
}

export default LoQuizDetails;
