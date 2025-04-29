import React, { useEffect, useState, FormEvent } from 'react';
import {
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box,
  LinearProgress,
  CircularProgress,
  Alert as MuiAlert,
  Stack,
} from '@mui/material';
import { Element, scroller } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import {
  useGetQuestionsQuery,
  useSubmitResponsesMutation,
} from '@redux/apis/user/TestApi';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { showError } from '@redux/slices/snackbarSlice';
import AppAlert from '../appAlert/AppAlert';
import { PATHS } from '@config/constants/paths';
import { useTranslation } from 'react-i18next';
import { TestQuestion } from '../../types/interfaces/TestQuestion';
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum';

const QUESTIONS_PER_PAGE = 11;

const TestForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { data, isLoading, isError } = useGetQuestionsQuery(language);
  const [submitResponses] = useSubmitResponsesMutation();
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (data?.questions) {
      console.log('Fetched questions:', data.questions);
    }
  }, [data]);

  useEffect(() => {
    // Smooth scroll to top of questions section
    scroller.scrollTo('quiz-top', {
      duration: 400,
      delay: 2,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
  }, [currentPage]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateResponses = (responses: { [key: string]: string }): boolean => {
    return (
      data?.questions?.length === Object.keys(responses).length &&
      Object.values(responses).every((response) => response)
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem(LocalStorageKeysEnum.HasCompletedTest, 'true');

    if (!validateResponses(responses)) {
      dispatch(showError(t('users.Please_answer_all_questions')));
      return;
    }

    try {
      const formattedResponses = Object.entries(responses).map(([questionId, answer]) => ({
        question_id: questionId,
        answer: answer,
        userId: userId,
      }));

      const payload = {
        userId,
        responses: formattedResponses,
      };

      await submitResponses(payload).unwrap();
      navigate(PATHS.DASHBOARD.STUDENT.ROOT);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil((data?.questions?.length || 0) / QUESTIONS_PER_PAGE) - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <MuiAlert severity="error">{t('Error fetching questions')}</MuiAlert>;

  const validQuestions = Array.isArray(data?.questions) ? data.questions : [];
  const totalPages = Math.ceil(validQuestions.length / QUESTIONS_PER_PAGE);
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <Stack
      spacing={2}
      m={4}
      sx={{
        borderRadius: 4,
        boxShadow: 2,
        padding: 4,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        {t('users.test_question')}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Element name="quiz-top">
          {validQuestions
            .slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE)
            .map((question: TestQuestion, index) => (
              <Box key={question._id} mb={4}>
                <Typography variant="h6">
                  {currentPage * QUESTIONS_PER_PAGE + index + 1}. {question.qtext}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={responses[question._id] || ''}
                    onChange={(event) =>
                      handleResponseChange(question._id, event.target.value)
                    }
                  >
                    {Array.isArray(question.options) && question.options.length > 0 ? (
                      question.options.map((option) => (
                        <FormControlLabel
                          key={option._id}
                          value={option.optionstext}
                          control={<Radio />}
                          label={option.optionstext}
                        />
                      ))
                    ) : (
                      <MuiAlert severity="error">
                        {t('users.No_options_available')}
                      </MuiAlert>
                    )}
                  </RadioGroup>
                </FormControl>
              </Box>
            ))}
        </Element>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} flexWrap="wrap" gap={2}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            {t('Previous')}
          </Button>

          <Box width="100%" mx={2}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>

          {currentPage < totalPages - 1 ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {t('Next')}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!validateResponses(responses)}
            >
              {t('Submit')}
            </Button>
          )}
        </Box>
      </form>

      <AppAlert />
    </Stack>
  );
};

export default TestForm;
