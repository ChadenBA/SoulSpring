import { Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { CourseFormProps } from './CourseForm.type';
import { CREATE_COURSE_FORM_CONFIG } from './CourseForm.constants';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField';
import useCourseForm from './useCourseForm';
import useUploadFile from 'src/hooks/useUploadFile';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useTranslation } from 'react-i18next';
import { generatePictureSrc } from '@utils/helpers/string.helpers';
import QuestionPretest from './pretest/questionPretest/QuestionPretest';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { GREY } from '@config/colors/colors';

function CourseForm({ formMethods, defaultValues }: CourseFormProps) {
  const {
    isLoadingData,
    categoryOptions,
    subCategoriesOption,
    selectedCategory,
    questions,
    handleAddQuestion,
    handleRemoveQuestion,
    handleAddAnswer,
    handleRemoveAnswer,
  } = useCourseForm({
    formMethods,
  });

  const { t } = useTranslation();

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods,
    fieldName: 'courseMedia',
    initPreview: generatePictureSrc(defaultValues?.coverMedia?.fileName),
    index: 0,
    id: 0,
  });

  if (isLoadingData) return <FallbackLoader />;

  return (
    <FormProvider {...formMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} gap={2}>
            <Stack mb={2}>
              <CustomTextField config={CREATE_COURSE_FORM_CONFIG.title} />
            </Stack>
            <Stack mb={2} direction="row" gap={2}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.categoryId,
                  options: categoryOptions,
                }}
              />
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.subcategoryId,
                  disabled: !selectedCategory,
                  options: subCategoriesOption,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={CREATE_COURSE_FORM_CONFIG.description} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <UploadInput
                onChange={handleOnChange}
                onDelete={handleResetPreview}
                preview={preview}
                label={t('course.upload_media')}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack
              spacing={2}
              width="100%"
              p={8}
              sx={{ border: `1px solid ${GREY.light}`, borderRadius: 8 }}
            >
              <Typography color="primary" fontWeight={'medium'} variant="h2">
                {t('course.pretest')}
              </Typography>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography color="secondary" fontWeight={'medium'} variant="h3">
                  {t('section.quiz.questions')}
                </Typography>
                <Tooltip title={t('section.quiz.add_question')} placement="right">
                  <IconButton onClick={handleAddQuestion} color="success">
                    <AddCircleOutlineOutlinedIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider />
              {questions.map((field, questionIndex) => {
                return (
                  <Grid item xs={12} key={field.id} p={2}>
                    <QuestionPretest
                      field={field}
                      formMethods={formMethods}
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={handleRemoveQuestion}
                      canDelete={questions.length > 1}
                      questionIndex={questionIndex}
                      handleRemoveAnswer={handleRemoveAnswer}
                      handleAddAnswer={() => handleAddAnswer(questionIndex)}
                    />
                  </Grid>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

export default CourseForm;
