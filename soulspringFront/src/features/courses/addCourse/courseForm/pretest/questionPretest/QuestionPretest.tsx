import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import { Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { QuestionPretestProps } from './QuestionPretest.type';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField';
import { QuestionTypeEnum } from '@config/enums/questionType.enum';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AnswerExam from '../answerPretest/AnswerPretest';
import { CustomLabel } from '@components/Inputs/customRadioButton/CustomRadioButton.style';
import { CREATE_COURSE_FORM_CONFIG } from '../../CourseForm.constants';

function QuestionPretest({
  questionIndex,
  canDelete,
  formMethods,
  handleDeleteQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
}: QuestionPretestProps) {
  const { t } = useTranslation();

  const questionToUpdate = formMethods.watch(`quiz.questions.${questionIndex}`);

  // if (typeof selected === 'number') {
  //   selectedLabel = options?.find((option) => Number(option.value) === selected)
  //     ?.label as string;

  //   return <>{t(selectedLabel || GLOBAL_VARIABLES.EMPTY_STRING)}</>;
  // }

  const isBinary = questionToUpdate ? questionToUpdate.type === QuestionTypeEnum.BINARY : false;

  const answers = formMethods.watch(`quiz.questions.${questionIndex}.answers`);

  return (
    <Stack spacing={1} sx={{ boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
      <Stack alignSelf={'flex-end'}>
        <Tooltip title={t('section.quiz.remove_question')}>
          <IconButton
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete ? theme.palette.error.main : theme.palette.action.disabled,
            }}
            onClick={() => handleDeleteQuestion(questionIndex)}
          >
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Grid container alignItems={'center'}>
        <Grid item xs={12} lg={3}>
          <CustomLabel fontWeight={'medium'} variant="h4">
            {t('section.quiz.question')}
          </CustomLabel>
        </Grid>
        <Grid item xs={12} lg={8}>
          <CustomTextField
            config={{
              ...CREATE_COURSE_FORM_CONFIG.questionTitle,
              name: `quiz.questions.${questionIndex}.question`,
            }}
          />
        </Grid>
      </Grid>

      <Grid container alignItems={'center'}>
        <Grid item xs={12} lg={3}>
          <CustomLabel fontWeight={'medium'} variant="h4">
            {t('section.quiz.question_type')}
          </CustomLabel>
        </Grid>
        <Grid item xs={12} lg={8}>
          <CustomSelectField
            config={{
              ...CREATE_COURSE_FORM_CONFIG.questionType,
              name: `quiz.questions.${questionIndex}.type`,
            }}
          />
        </Grid>
      </Grid>

      {!isBinary ? (
        <Stack p={4}>
          <Grid container alignItems={'center'}>
            <Grid item xs={12} lg={4}>
              <Stack direction={'row'} spacing={4}>
                <Typography color={'primary'} fontWeight={'medium'} variant="h2">
                  {t('section.quiz.answers')}
                </Typography>
                <Tooltip title={t('section.quiz.add_answer')}>
                  <IconButton onClick={() => handleAddAnswer(questionIndex)} color="success">
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
            {answers?.map((field, answerIndex) => (
              <Grid item xs={12} key={field.id}>
                <AnswerExam
                  canDelete={answers.length > 2}
                  questionIndex={questionIndex}
                  answerIndex={answerIndex}
                  handleRemoveAnswer={handleRemoveAnswer}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <Grid container alignItems={'center'}>
          <Grid item xs={12} lg={3}>
            <CustomLabel fontWeight={'medium'} variant="h4">
              {t('section.quiz.question_isValid')}
            </CustomLabel>
          </Grid>
          <Grid item xs={12} lg={7}>
            <CustomRadioButton
              config={{
                ...CREATE_COURSE_FORM_CONFIG.questionIsValid,
                name: `quiz.questions.${questionIndex}.isValid`,
              }}
            />
          </Grid>
        </Grid>
      )}
      <Divider />
    </Stack>
  );
}

export default QuestionPretest;
