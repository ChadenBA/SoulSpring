import BodyCard from '@components/cards/bodyCard/BodyCard';
import { useTranslation } from 'react-i18next';
import EnrolledCoursesList from './enrolledCourses/EnrolledCoursesList';

function StudentCoursesPage() {
  const { t } = useTranslation();
  return (
    <BodyCard title={t('course.enrolled_courses')}>
      <EnrolledCoursesList />
    </BodyCard>
  );
}

export default StudentCoursesPage;
