import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AllCoursesListProps } from './AllCoursesList.type';
import NoDataFound from '@components/noDataFound/NoDataFound';
import CoursesListSkeleton from '@features/courses/coursesList/coursesListSkeleton/CoursesListSkeleton';
import CourseCard from '@features/courses/coursesCard/CourseCard';
import { Stack } from '@mui/material';
import { PATHS } from '@config/constants/paths';

function AllCoursesList({ courses, isLoading, isAdmin }: AllCoursesListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToEditCoursePage = (id: number) => {
    navigate(`${PATHS.DASHBOARD.ADMIN.COURSES.ROOT}/${id}`);
  };

  if (courses?.length === 0) return <NoDataFound message={t('home.no_course_found')} />;

  if (isLoading) return <CoursesListSkeleton />;
  return (
    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'flex-start'}>
      {Boolean(courses) &&
        courses?.map((course) => (
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
            isAdmin={isAdmin}
            isEnrolled={course.isSubscribed}
            navigateToEditCoursePage={navigateToEditCoursePage}
          />
        ))}
    </Stack>
  );
}

export default AllCoursesList;
