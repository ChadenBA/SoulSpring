import { Collapse, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadMultipleFiles from '@components/Inputs/uploadMultipleFiles/UploadMultipleFiles';
import {
  CREATE_EDUCATIONAL_UNIT_FORM_CONFIG,
  CREATE_LEARNING_OBJECT_FORM_CONFIG,
} from '../../EuForm.constants';
import { EuBodyProps } from './EuBody.type';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Question from '../../question/Question';
import { GREY } from '@config/colors/colors';
import { useState } from 'react';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import trash from '@assets/logo/icon-trash.svg';
import { QuizRoot, StyledArrowIcon } from '../Eu.style';

function EuBody({
  courseId,
  expanded,
  files,
  euIndex,
  isEditMode,
  field,
  sectionFormMethods,
  setFiles,
  handleAddQuestion,
  handleRemoveQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
  setDeletedMedia,
  handleAddLearningObject,
}: EuBodyProps) {
  const { t } = useTranslation();
  const [expandedQuiz, setExpandedQuiz] = useState(true);
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Collapse in={expanded}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} pr={5}>
          <CustomTextField
            config={{
              ...CREATE_EDUCATIONAL_UNIT_FORM_CONFIG.title,
              name: `eu.${euIndex}.title`,
            }}
          />
        </Grid>

        {field?.learningObjects.map((lo, loIndex) => (
          <Stack
            key={loIndex}
            spacing={2}
            sx={{
              width: '100%',
              margin: 3,
              padding: 1.5,
              border: `1px solid ${GREY.light}`,
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={2} p={0} m={0} alignItems="center">
              <Typography variant="h3" pt={0.2}>
                {t('eu.learning_objects')}
              </Typography>
              <IconButton onClick={() => handleAddLearningObject(euIndex)} color="success">
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Stack>
            <Divider />
            <Grid container spacing={3} alignItems={'center'}>
              <Grid item xs={6}>
                <CustomTextField
                  config={{
                    ...CREATE_LEARNING_OBJECT_FORM_CONFIG.title,
                    name: `eu.${euIndex}.learningObjects.${loIndex}.title`,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomRadioButton
                  config={{
                    ...CREATE_LEARNING_OBJECT_FORM_CONFIG.type,
                    name: `eu.${euIndex}.learningObjects.${loIndex}.type`,
                    disabled: loIndex === 0 || loIndex === 1,
                    defaultValue: loIndex,
                  }}
                />
              </Grid>
            </Grid>
            <UploadMultipleFiles
              courseId={courseId}
              files={
                files[euIndex]?.[loIndex]?.filter(({ metadata }) => !metadata.isSupplementary) || []
              }
              isSupplementary={false}
              euIndex={euIndex}
              loIndex={loIndex}
              setFiles={setFiles}
              isEditMode={isEditMode}
              setDeletedMedia={setDeletedMedia}
            />
            {!isEditMode ? (
              <Stack spacing={2} width="100%" p={8}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography color="primary" fontWeight="medium" variant="h2">
                    {t('section.quiz.questions')}
                  </Typography>
                  <Tooltip title={t('section.quiz.add_question')} placement="right">
                    <IconButton onClick={() => handleAddQuestion(euIndex, loIndex)} color="success">
                      <AddCircleOutlineOutlinedIcon fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Divider />
                {lo.quiz.questions?.map((q, questionIndex) => (
                  <Grid item xs={12} key={q.id} p={0}>
                    <Question
                      key={field.id}
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleRemoveQuestion(euIndex, loIndex, questionIndex)
                      }
                      canDelete={lo.quiz.questions?.length > 1}
                      questionIndex={questionIndex}
                      field={field}
                      euIndex={euIndex}
                      loIndex={loIndex}
                      euFormMethods={sectionFormMethods}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                    />
                  </Grid>
                ))}
              </Stack>
            ) : (
              <QuizRoot>
                <Stack
                  direction={'row'}
                  spacing={2}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <StyledArrowIcon
                      onClick={() => setExpandedQuiz(!expandedQuiz)}
                      expanded={
                        expandedQuiz ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING
                      }
                    />
                    <Typography variant="h3" color="primary">
                      {t('section.quiz.quiz')}
                    </Typography>
                  </Stack>
                </Stack>
                <Collapse in={expandedQuiz} timeout={700}>
                  <Stack spacing={2} width="100%" p={8}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                      <Typography color="primary" fontWeight={'medium'} variant="h2">
                        {t('section.quiz.questions')}
                      </Typography>
                      <Tooltip title={t('section.quiz.add_question')} placement="right">
                        <IconButton
                          onClick={() => handleAddQuestion(euIndex, loIndex)}
                          color="success"
                        >
                          <AddCircleOutlineOutlinedIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Divider />
                    {lo.quiz.questions?.map((i, questionIndex) => {
                      return (
                        <Grid item xs={12} key={i.id} p={2}>
                          <Question
                            key={field.id}
                            handleAddQuestion={handleAddQuestion}
                            handleDeleteQuestion={() => {
                              isEditMode &&
                              !field.learningObjects[loIndex].quiz.questions[questionIndex].id &&
                              field?.learningObjects[loIndex]?.quiz.questions[questionIndex].id
                                ? setOpenQuestionDialog(true)
                                : handleRemoveQuestion(euIndex, loIndex, questionIndex);
                            }}
                            canDelete={field.learningObjects[loIndex].quiz.questions.length > 1}
                            questionIndex={questionIndex}
                            field={field}
                            euIndex={euIndex}
                            loIndex={loIndex}
                            euFormMethods={sectionFormMethods}
                            handleRemoveAnswer={() => {
                              isEditMode &&
                                !field.learningObjects[loIndex].quiz.questions[questionIndex].id &&
                                field.learningObjects[loIndex].quiz.questions[
                                  questionIndex
                                ].answers.map((j, answerIndex) => {
                                  if (j.id) {
                                    setOpenAnswerDialog(true);
                                  } else {
                                    handleRemoveAnswer(
                                      euIndex,
                                      loIndex,
                                      questionIndex,
                                      answerIndex,
                                    );
                                  }
                                });
                            }}
                            handleAddAnswer={() => handleAddAnswer(euIndex, loIndex, questionIndex)}
                          />
                        </Grid>
                      );
                    })}
                  </Stack>
                </Collapse>

                <CustomDialogActions
                  open={open || openQuizDialog || openQuestionDialog || openAnswerDialog}
                  onAccept={
                    open
                      ? () => {}
                      : openQuizDialog
                      ? () => {}
                      : openQuestionDialog
                      ? () => () => {}
                      : () => () => {}
                  }
                  onClose={() => {
                    setOpen(false);
                    setOpenQuizDialog(false);
                    setOpenQuestionDialog(false);
                    setOpenAnswerDialog(false);
                  }}
                  onCancel={() => {
                    setOpen(false);
                    setOpenQuizDialog(false);
                    setOpenQuestionDialog(false);
                    setOpenAnswerDialog(false);
                  }}
                >
                  <Stack direction={'column'} spacing={1} alignItems={'center'}>
                    <img src={trash} width={100} />
                    <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
                      {open
                        ? t('section.delete_section_confirm')
                        : openQuizDialog
                        ? t('section.quiz.delete_quiz_confirm')
                        : openQuestionDialog
                        ? t('section.quiz.delete_question_confirm')
                        : t('section.quiz.delete_answer_confirm')}
                    </Typography>
                    <Typography variant="h6" color={GREY.main}>
                      {open
                        ? t('section.delete_section')
                        : openQuizDialog
                        ? t('section.quiz.delete_quiz')
                        : openQuestionDialog
                        ? t('section.quiz.delete_question')
                        : t('section.quiz.delete_answer')}
                    </Typography>
                  </Stack>
                </CustomDialogActions>
              </QuizRoot>
            )}
            <Typography variant="h3">{t('eu.supplementary_materials')}</Typography>
            <UploadMultipleFiles
              courseId={courseId}
              files={
                files[euIndex]?.[loIndex]?.filter(({ metadata }) => metadata.isSupplementary) || []
              }
              isSupplementary={true}
              euIndex={euIndex}
              loIndex={loIndex}
              setFiles={setFiles}
              isEditMode={isEditMode}
              setDeletedMedia={setDeletedMedia}
            />
          </Stack>
        ))}
      </Grid>
      <CustomDialogActions
        open={open || openQuizDialog || openQuestionDialog || openAnswerDialog}
        onAccept={
          open ? () => {} : openQuizDialog ? () => {} : openQuestionDialog ? () => {} : () => {}
        }
        onClose={() => {
          setOpen(false);
          setOpenQuizDialog(false);
          setOpenQuestionDialog(false);
          setOpenAnswerDialog(false);
        }}
        onCancel={() => {
          setOpen(false);
          setOpenQuizDialog(false);
          setOpenQuestionDialog(false);
          setOpenAnswerDialog(false);
        }}
      >
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={trash} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {open
              ? t('section.delete_section_confirm')
              : openQuizDialog
              ? t('section.quiz.delete_quiz_confirm')
              : openQuestionDialog
              ? t('section.quiz.delete_question_confirm')
              : t('section.quiz.delete_answer_confirm')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {open
              ? t('section.delete_section')
              : openQuizDialog
              ? t('section.quiz.delete_quiz')
              : openQuestionDialog
              ? t('section.quiz.delete_question')
              : t('section.quiz.delete_answer')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </Collapse>
  );
}

export default EuBody;
