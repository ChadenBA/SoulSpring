import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEnrollCourseMutation, useGetCourseByIdQuery } from '@redux/apis/courses/coursesApi';
import CourseHeader from '@features/courses/courseDetails/courseDetailsHeader/CourseDetailsHeader';
import CourseMediaCard from '@features/courses/courseDetails/courseMediaCard/CourseMediaCard';
import { useTranslation } from 'react-i18next';
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style';
import RectangularCard from '@components/cards/rectangularCard/RectangularCard';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useAppDispatch } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import CourseEducationalUnits from '@features/courses/courseDetails/courseEducationalUnits/CourseEducationalUnits';
import NotFound from '@pages/notFound/NotFound';

export const CourseDetail = () => {
  const { t } = useTranslation();
  const { courseId } = useParams<string>();
  const dispatch = useAppDispatch();

  const [enrollCourse] = useEnrollCourseMutation();

  const { data, isLoading } = useGetCourseByIdQuery(courseId as string);

  const course = data?.data;

  const handleEnroll = async (id: number) => {
    try {
      await enrollCourse(id).unwrap;
      dispatch(showSuccess(t('course.enroll_course_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    }
  };

  if (isLoading) return <FallbackLoader />;

  return (
    <>
      {!course ? (
        <NotFound />
      ) : (
        <StackWithBackground>
          <CourseHeader
            title={course.title}
            background={course.coverMedia.fileName}
            learningObjectsCount={course.learningObjectsCount}
            enrolledCount={course.subscribedUsersCount}
            category={course?.category?.title}
            subcategory={course?.subcategory?.title}
          />

          <Grid container>
            <Grid item lg={8.5} sm={12}>
              <RectangularCard title={t('course.description')}>
                <Typography>{course.description}</Typography>
              </RectangularCard>
              {course.educationalUnits && course.educationalUnits.length > 0 ? (
                <CourseEducationalUnits
                  isEnrolled={course.isSubscribed}
                  eus={course.educationalUnits}
                  passedQuizzes={course.passedQuizzes}
                />
              ) : (
                <RectangularCard title="Modules">
                  <Typography>{t('course.no_steps_found')}</Typography>
                </RectangularCard>
              )}
            </Grid>
            <Grid item lg={3} position={'relative'} top={{ sm: '0', md: '0', lg: '-200px' }}>
              <Stack direction={{ lg: 'column', md: 'row', sm: 'column' }} gap={2}>
                <CourseMediaCard
                  isEnrolled={course?.isSubscribed}
                  handleEnroll={() => {
                    handleEnroll(course.id);
                  }}
                  image={course.coverMedia.fileName}
                />
              </Stack>
            </Grid>
          </Grid>
        </StackWithBackground>
      )}
    </>
  );
};

export default CourseDetail;
