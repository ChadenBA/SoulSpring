import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Stack } from '@mui/material';
import CustomStepper from '@components/CustomStepper/CustomStepper';
import { STEPS } from './AddCourseForm.constants';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import { GoBackButton } from './AddCourseForm.style';
import { useForm } from 'react-hook-form';
import {
  useCreateCourseMutation,
  useCreateEuMutation,
  useUpdateCourseMutation,
} from '@redux/apis/courses/coursesApi';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import CourseForm from './courseForm/CourseForm';
import { useNavigate } from 'react-router-dom';
import { AddCourseFormProps } from './AddCourseForm.type';
import { CourseFormValues } from './courseForm/CourseForm.type';
import { generateCourseFormDefaultValues } from './AddCourseForm.helpers';
import EducationalUnitForm from './sectionForm/EuForm';
import { Eu } from 'types/models/Eu';
import {
  DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
  DEFAULT_BASIC_EDUCATIONAL_UNIT,
  DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
} from './sectionForm/EuForm.constants';
import { PATHS } from '@config/constants/paths';
import { MediaWithMetadata } from '@components/Inputs/uploadMultipleFiles/UplaodMultipleFiles.type';
import { RootState } from '@redux/store';
import { Progress } from '@redux/slices/uploadSlice';

export default function AddCourseForm({
  isEditMode,
  courseDefaultValues,
  id,
  isFetching,
}: AddCourseFormProps) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const transformDefaultValuesToFiles = (
    defaultValues?: typeof courseDefaultValues,
  ): Record<number, Record<number, MediaWithMetadata[]>> => {
    if (!defaultValues) return {};

    const files: Record<number, Record<number, MediaWithMetadata[]>> = {};

    defaultValues.educationalUnits.forEach((eu, index) => {
      if (!eu.id) return;

      files[index] = {};

      eu.learningObjects.forEach((lo, loIndex) => {
        if (!lo.id) return;
        if (!lo.media) {
          files[index][loIndex] = [];
          return;
        }

        files[index][loIndex] = lo.media.map((media) => ({
          file: media,
          metadata: { isSupplementary: media.isSupplementary },
        }));
      });
    });

    return files;
  };
  const uploadProgresses = useAppSelector((state: RootState) => state.upload.progresses);
  // uploadProgresses is an object with keys as file names and values as upload progress how to convert it to boolean value
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    const isCurrentlyUploading = Object.values(uploadProgresses).some(
      (progress: Progress) => progress.progress < 100,
    );
    setIsUploading(isCurrentlyUploading);
  }, [uploadProgresses]);

  const [files, setFiles] = useState<Record<number, Record<number, MediaWithMetadata[]>>>(
    transformDefaultValuesToFiles(courseDefaultValues),
  );

  const [courseId, setCourseId] = useState<string | null | undefined>(id || null);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const StepperFormMethods = useForm<CourseFormValues>({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: generateCourseFormDefaultValues(courseDefaultValues),
  });

  const handleNextStep = () => setActiveStep((prev) => prev + 1);

  useEffect(() => {
    setFiles(transformDefaultValuesToFiles(courseDefaultValues));
  }, [courseDefaultValues]);

  const defaultValues = useMemo(() => {
    if (courseDefaultValues) {
      return {
        eu: courseDefaultValues.educationalUnits.map((eu) => ({
          ...eu,
          euId: eu.id,
          learningObjects: eu.learningObjects.map((lo) => ({
            ...lo,
            questions: lo.quiz.questions.map((question) => ({
              ...question,
              answers: question.answers.map((answer) => ({
                ...answer,
                isValid: answer.isValid || false,
              })),
            })),
          })),
        })),
      };
    } else {
      return {
        eu: [
          DEFAULT_BASIC_EDUCATIONAL_UNIT,
          DEFAULT_INTERMEDIATE_EDUCATIONAL_UNIT,
          DEFAULT_ADVANCED_EDUCATIONAL_UNIT,
        ],
      };
    }
  }, [courseDefaultValues]);

  const educationalUnitFormMethod = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: defaultValues,
  });

  const [createCourseActionApi, { isLoading }] = useCreateCourseMutation();
  const [createEuApi, { isLoading: isLoadingEu }] = useCreateEuMutation();
  const [updateCourseActionApi, { isLoading: isLoadingUpdate }] = useUpdateCourseMutation();

  const handleAddCourse = StepperFormMethods.handleSubmit(async (values) => {
    try {
      if (isEditMode) {
        await updateCourseActionApi({
          id: Number(courseId),
          course: values,
        }).unwrap();
        dispatch(showSuccess(t('course.update_course_success')));
      } else {
        const courseResponse = await createCourseActionApi(values).unwrap();
        setCourseId(String(courseResponse.data.id));
        dispatch(showSuccess(t('course.add_course_success')));
      }
      setCompleted({ ...completed, [activeStep]: true });
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      dispatch(showError(t('course.api_course_failure')));
    }
  });

  const handleAddSection = educationalUnitFormMethod.handleSubmit(async (values) => {
    try {
      await createEuApi({
        id: Number(courseId),
        eu: values.eu as unknown as Eu[],
        files: files as any,
      }).unwrap();
      dispatch(showSuccess(t('section.add_section_success')));
      navigate(PATHS.DASHBOARD.ADMIN.COURSES.ROOT);
    } catch (error) {
      dispatch(showError(t('section.add_section_failure')));
    }
  });

  const handleGoBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CourseForm
            formMethods={StepperFormMethods}
            isEditMode={isEditMode}
            defaultValues={courseDefaultValues}
          />
        );
      case 1:
        return (
          <EducationalUnitForm
            courseId={courseId ?? '0'}
            euFormMethods={educationalUnitFormMethod}
            isEditMode={isEditMode}
            isFetching={isFetching}
            handleAddEU={handleAddSection}
            files={files as any}
            setFiles={setFiles as any}
          />
        );
      default:
        return (
          <CourseForm
            formMethods={StepperFormMethods}
            defaultValues={courseDefaultValues}
            isEditMode={isEditMode}
          />
        );
    }
  };

  return (
    <Box>
      <CustomStepper steps={STEPS} activeStep={activeStep} completed={completed} />
      {/* Stepper Content */}
      {renderStepContent(activeStep)}
      <Divider />
      {/* Stepper Buttons */}
      <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <GoBackButton disabled={activeStep === 0} onClick={handleGoBack}>
          {t('common.back')}
        </GoBackButton>
        <Stack>
          <Stack direction={'row'} spacing={2}>
            {isEditMode && activeStep === 0 && (
              <Button onClick={handleNextStep} variant="contained" sx={{ color: 'white' }}>
                {t('common.skip')}
              </Button>
            )}
            {activeStep === 0 && (
              <CustomLoadingButton
                isLoading={isLoading || isLoadingUpdate}
                onClick={handleAddCourse}
              >
                {isEditMode ? t('common.update') : t('common.next')}
              </CustomLoadingButton>
            )}
            {activeStep === 1 && !isEditMode && (
              <CustomLoadingButton
                isLoading={isLoadingEu || isLoadingUpdate || isUploading}
                onClick={handleAddSection}
              >
                {t('common.finish')}
              </CustomLoadingButton>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
