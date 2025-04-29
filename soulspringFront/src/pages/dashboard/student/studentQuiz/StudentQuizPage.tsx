import BodyCard from '@components/cards/bodyCard/BodyCard';
import StudentQuizTable from './studentQuizTable/StudentQuizTable';
import { useTranslation } from 'react-i18next';

function StudentQuizPage() {
  const { t } = useTranslation();
  return (
    <BodyCard title={t('sidebar.my_quiz')}>
      <StudentQuizTable />
    </BodyCard>
  );
}

export default StudentQuizPage;
