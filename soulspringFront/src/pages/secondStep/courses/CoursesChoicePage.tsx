import CustomPagination from '@components/customPagination/CustomPagination';
import NoDataFound from '@components/noDataFound/NoDataFound';
import { PATHS } from '@config/constants/paths';
import CourseCard from '@features/courses/coursesCard/CourseCard';
import CoursesListSkeleton from '@features/courses/coursesList/coursesListSkeleton/CoursesListSkeleton';
import { Stack, Button, Typography, Skeleton } from '@mui/material';
import ForbiddenPage from '@pages/forbidden/ForbiddenPage';
import { useGetCoursesBySubcategoryQuery } from '@redux/apis/courses/coursesApi';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';

function CoursesChoicePage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { subcategoryId } = useParams();

  const subcategoryIdNumber = parseInt(subcategoryId as string, 10);
  const { queryParams, handlePageChange } = usePagination();

  const {
    data: coursesData,
    isLoading: isLoadingCourses,
    isFetching,
    isError,
  } = useGetCoursesBySubcategoryQuery({
    params: queryParams,
    subcategoryId: subcategoryIdNumber,
  });
  if (isLoadingCourses)
    return (
      <>
        <Stack>
          <Skeleton
            variant="text"
            width={400}
            height={50}
            sx={{ alignSelf: 'center', marginTop: '20px' }}
          />
          <CoursesListSkeleton />
        </Stack>
      </>
    );

  if (!coursesData?.data?.length) {
    return <NoDataFound message={t('course.not_found')} />;
  }

  if (isError) {
    return <ForbiddenPage />;
  }

  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} m={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate(PATHS.SECOND_STEP.CATEGORIES);
          }}
        >
          {t('common.back')}
        </Button>
      </Stack>
      <Typography variant="h1" sx={{ alignSelf: 'center', color: 'primary.main', marginTop: 2 }}>
        {t('home.choose_course')}
      </Typography>
      <Stack
        direction="row"
        gap={4}
        sx={{
          margin: '50px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {coursesData?.data.map((course) => (
          <CourseCard
            width="40vh"
            key={course.id}
            id={course.id}
            isActive={course?.isActive}
            image={course.coverMedia?.fileName}
            isOffline={course.isOffline}
            courseTitle={course.title}
            educationaUnitsCount={course.educationalUnitsCount}
            learningObjectsCount={course.learningObjectsCount}
            createdAt={course.createdAt}
            isEnrolled={course.isSubscribed}
          />
        ))}
      </Stack>
      <Stack direction={'row'} justifyContent={'center'} mt={4}>
        <CustomPagination
          page={queryParams.page}
          count={coursesData?.meta.count}
          isLoading={isFetching}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
}

export default CoursesChoicePage;
