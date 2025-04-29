import { Grid } from '@mui/material'
import StatisticsCardSkeleton from '@components/statisticsCard/StatisticsCardSkeleton'

function DashboardSkeleton() {
  return (
    <Grid container gap={2}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} md={6} lg={3.8} key={index}>
          <StatisticsCardSkeleton />
        </Grid>
      ))}
    </Grid>
  )
}

export default DashboardSkeleton
