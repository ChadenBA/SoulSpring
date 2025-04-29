import StatisticsCard from '@components/statisticsCard/StatisticsCard';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { useTranslation } from 'react-i18next';

import DashboardSkeleton from '../DashboardSkeleton';
import BodyCard from '@components/cards/bodyCard/BodyCard';
import ResultsPage from '@pages/silvermanResult/SilvermanResult';
import { useGetResultQuery } from '@redux/apis/user/TestApi';

function StudentDashboard() {
  const { isLoading } = useGetResultQuery();
  const { t } = useTranslation();

  if (isLoading) return <DashboardSkeleton />;
  return (
    <>
      
        <BodyCard title={t('common.learning_style')}>
          <ResultsPage />
        </BodyCard>
    </>
  );
}

export default StudentDashboard;
