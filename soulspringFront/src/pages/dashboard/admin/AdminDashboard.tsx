import { useGetAdminStatisticsQuery } from '@redux/apis/dashboard/dashboardApi';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Grid } from '@mui/material';
import DashboardSkeleton from '../DashboardSkeleton';
import StressIcon from '@mui/icons-material/Whatshot';
import PieChartComponent from '@components/CustomCharts/pieChart/PieChart';
import StatisticsCard from '@components/cards/statCard/StatisticsCard';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function AdminDashboard() {
  const { data, isLoading } = useGetAdminStatisticsQuery();
  const { t } = useTranslation();

  if (isLoading) return <DashboardSkeleton />;

  // Prepare data for Pie Charts
  const ageCountsData = Object.entries(data?.ageCounts || {}).map(([key, value]) => ({
    title: key,
    value,
  }));

  const disorderData = Object.entries(data?.disorderDistribution || {}).map(([key, value]) => ({
    title: key,
    value,
  }));

  const severityData = Object.entries(data?.severityDistribution || {}).map(([key, value]) => ({
    title: key,
    value,
  }));



  return (
    <>
      <Grid container gap={2}>
        {/* Users */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.users')}
            value={data?.users}
            subtitle={t('dashboard.admin.users_subtitle')}
            icon={<AccountCircleOutlinedIcon />}
          />
        </Grid>

        {/* Professionals */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.prof')}
            value={data?.Professionals}
            subtitle={t('dashboard.admin.prof_subtitle')}
            icon={<PeopleAltIcon />}
          />
        </Grid>

        {/* Mean Stress Level */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.mean_stress')}
            value={data?.meanStressLevel}
            subtitle={t('dashboard.admin.mean_stress_subtitle')}
            icon={<StressIcon />}
          />
        </Grid>

        {/* Posts */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.posts')}
            value={data?.posts}
            subtitle={t('dashboard.admin.posts_subtitle')}
            icon={<MenuBookOutlinedIcon />}
          />
        </Grid>

        {/* Comments */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.comments')}
            value={data?.comments}
            subtitle={t('dashboard.admin.comments_subtitle')}
            icon={<CommentIcon />}
          />
        </Grid>

        {/* Likes */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.likes')}
            value={data?.likes}
            subtitle={t('dashboard.admin.likes_subtitle')}
            icon={<FavoriteIcon />}
          />
        </Grid>

        {/* Blocked Posts */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.blocked_posts')}
            value={data?.blockedPosts}
            subtitle={t('dashboard.admin.blocked_posts_subtitle')}
            icon={<BlockIcon />}
          />
        </Grid>

        {/* Blocked Comments */}
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.blocked_comments')}
            value={data?.blockedComments}
            subtitle={t('dashboard.admin.blocked_comments_subtitle')}
            icon={<BlockIcon />}
          />
        </Grid>

        {/* Age Counts Pie Chart */}
        <Grid item xs={12} md={6} lg={5.8}>
          <PieChartComponent title={t('dashboard.admin.Age_Distribution')} data={ageCountsData} />
        </Grid>

        {/* Disorder Distribution Pie Chart */}
        <Grid item xs={12} md={6} lg={5.8}>
          <PieChartComponent title={t('dashboard.admin.Disorder_Distribution')} data={disorderData} />
        </Grid>

        {/* Severity Distribution Pie Chart */}
        <Grid item xs={12} md={6} lg={5.8}>
          <PieChartComponent title={t('dashboard.admin.Severity_Distribution')} data={severityData} />
        </Grid>

     
      </Grid>
    </>
  );
}

export default AdminDashboard;
