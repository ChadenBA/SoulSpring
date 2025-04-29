import { Avatar, Skeleton, Stack } from '@mui/material'
import { StatisticsCardRoot } from './StatisticsCard.style'

function StatisticsCardSkeleton() {
  return (
    <StatisticsCardRoot spacing={1}>
      <Skeleton variant="text" width={100} height={30} />
      <Skeleton variant="text" width={150} height={20} />
      <Stack justifyContent="space-between" direction="row" spacing={2}>
        <Skeleton variant="text" width={100} height={40} />
        <Skeleton variant="circular" width={40} height={40}>
          <Avatar sx={{ width: '40px', height: '40px' }} />
        </Skeleton>
      </Stack>
    </StatisticsCardRoot>
  )
}

export default StatisticsCardSkeleton
