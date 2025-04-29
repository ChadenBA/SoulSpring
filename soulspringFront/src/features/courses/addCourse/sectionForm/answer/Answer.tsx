import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { AnswerProps } from './Answer.type';
import CustomCheckboxButton from '@components/Inputs/customCheckboxButton/CustomCheckboxButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { CREATE_LEARNING_OBJECT_FORM_CONFIG } from '../EuForm.constants';

function Answer({
  euIndex,
  loIndex,
  questionIndex,
  answerIndex,
  canDelete,
  handleRemoveAnswer,
}: AnswerProps) {
  const { t } = useTranslation();
  return (
    <Grid container display={'flex'} alignItems={'center'}>
      <Grid item xs={12} lg={1}>
        <CustomCheckboxButton
          config={{
            ...CREATE_LEARNING_OBJECT_FORM_CONFIG.answerIsValid,
            name: `eu.${euIndex}.learningObjects.${loIndex}.quiz.questions.${questionIndex}.answers.${answerIndex}.isValid`,
          }}
        />
      </Grid>

      <Grid item xs={12} lg={10}>
        <CustomTextField
          config={{
            ...CREATE_LEARNING_OBJECT_FORM_CONFIG.answerTitle,
            name: `eu.${euIndex}.learningObjects.${loIndex}.quiz.questions.${questionIndex}.answers.${answerIndex}.answer`,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={1}>
        <Tooltip title={t('section.quiz.remove_answer')}>
          <IconButton
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete ? theme.palette.error.main : theme.palette.action.disabled,
            }}
            onClick={() => handleRemoveAnswer(euIndex, loIndex, questionIndex, answerIndex)}
            color="error"
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Answer;
