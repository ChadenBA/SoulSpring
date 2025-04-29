import { useGetProStatisticsQuery } from '@redux/apis/dashboard/dashboardApi';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Icons
import PostIcon from '@mui/icons-material/AutoStoriesOutlined';
import LikeIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import BlockIcon from '@mui/icons-material/Block';
import HighlightIcon from '@mui/icons-material/Whatshot';

// Components
import DashboardSkeleton from '../DashboardSkeleton';

import BarChartComponent from '@components/CustomCharts/pieChart/BarChart'; 

import StatisticsCard from '@components/cards/statCard/StatisticsCard';
import { Outlet } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

function ProfessionalDashboard() {
  const { data, isLoading } = useGetProStatisticsQuery();
  const { t } = useTranslation();

  if (isLoading) return <DashboardSkeleton />;

  // Chart Data
 
  const chartData = [
    { name: t('dashboard.prof.total_posts'), value: data?.totalPosts || 0 },
    { name: t('dashboard.prof.total_likes'), value: data?.totalLikes || 0 },
    { name: t('dashboard.prof.total_comments'), value: data?.totalComments || 0 },
    { name: t('dashboard.prof.blocked_posts'), value: data?.blockedPostCount || 0 },
    { name: t('dashboard.prof.blocked_comments'), value: data?.blockedCommentCount || 0 },
  ];

  return (

    <Box sx={{ px: 2 }}>
    <Typography variant="h4" mb={3} fontWeight="bold">
      {t('dashboard.prof.title')}
    </Typography>
  
    <Grid container spacing={3}>
      {[
        {
          title: t('dashboard.prof.total_posts'),
          value: data?.totalPosts,
          subtitle: t('dashboard.prof.total_posts_subtitle'),
          icon: <PostIcon color="primary" />,
        },
        {
          title: t('dashboard.prof.total_likes'),
          value: data?.totalLikes,
          subtitle: t('dashboard.prof.total_likes_subtitle'),
          icon: <LikeIcon color="secondary" />,
        },
        {
          title: t('dashboard.prof.total_comments'),
          value: data?.totalComments,
          subtitle: t('dashboard.prof.total_comments_subtitle'),
          icon: <CommentIcon color="success" />,
        },
        {
          title: t('dashboard.prof.blocked_posts'),
          value: data?.blockedPostCount,
          subtitle: t('dashboard.prof.blocked_posts_subtitle'),
          icon: <BlockIcon color="error" />,
        },
        {
          title: t('dashboard.prof.blocked_comments'),
          value: data?.blockedCommentCount,
          subtitle: t('dashboard.prof.blocked_comments_subtitle'),
          icon: <BlockIcon color="error" />,
        },
        {
          title: t('dashboard.prof.most_liked_post'),
          value: data?.mostLikedPost?.likes,
          subtitle: data?.mostLikedPost?.title,
          icon: <LikeIcon color="info" />,
        },
        {
          title: t('dashboard.prof.most_commented_post'),
          value: data?.mostCommentedPost?.comments?.length,
          subtitle: data?.mostCommentedPost?.title,
          icon: <CommentIcon color="warning" />,
        },
        {
          title: t('dashboard.prof.most_liked_comment'),
          value: data?.mostLikedComment?.likes?.length || 0,
          subtitle: data?.mostLikedComment?.content,
          icon: <HighlightIcon color="info" />,
        },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={stat.title}>
          <StatisticsCard
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        </Grid>
      ))}
  


        {/* Bar Chart */}
        <Grid item xs={12}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={11}
          >
            <BarChartComponent
              title={t('dashboard.prof.activity_overview')}
              data={chartData}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
  <Outlet />

}

export default ProfessionalDashboard;
