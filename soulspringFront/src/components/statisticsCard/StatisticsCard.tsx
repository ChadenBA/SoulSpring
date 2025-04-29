import { Stack } from '@mui/material'
import {
  IconWrapper,
  StatisticsCardRoot,
  Subtitle,
  Title,
  Value,
} from './StatisticsCard.style'
import { StatisticsCardProps } from './StatisticsCard.type'

function StatisticsCard({ icon, title, value, subtitle }: StatisticsCardProps) {
  return (
    <StatisticsCardRoot spacing={1}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Stack justifyContent="space-between" direction={'row'}>
        <Value>{value}</Value>
        <IconWrapper>{icon}</IconWrapper>
      </Stack>
    </StatisticsCardRoot>
  )
}

export default StatisticsCard
