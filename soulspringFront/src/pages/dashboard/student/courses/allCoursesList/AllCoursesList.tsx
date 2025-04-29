import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AllCoursesListProps } from './AllCoursesList.type';
import NoDataFound from '@components/noDataFound/NoDataFound';

import { Stack } from '@mui/material';
import { PATHS } from '@config/constants/paths';
import CoursesListSkeleton from '@features/courses/coursesList/coursesListSkeleton/CoursesListSkeleton';
import CourseCard from '@features/courses/coursesCard/CourseCard';

function AllCoursesList({ courses, isLoading }: AllCoursesListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToCourseDetailsPage = (id: number) => {
    navigate(`${PATHS.COURSES.ROOT}/${id}`);
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
            studentLevel={course.studentLevel}
            isOffline={course.isOffline}
            courseTitle={course.title}
            educationaUnitsCount={course.educationalUnitsCount}
            learningObjectsCount={course.learningObjectsCount}
            createdAt={course.createdAt}
            isEnrolled={course.isSubscribed}
            navigateToEditCoursePage={navigateToCourseDetailsPage}
            isAdmin={false}
          />
        ))}
    </Stack>
  );
}

export default AllCoursesList;
