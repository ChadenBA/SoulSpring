import { useTranslation } from 'react-i18next'
import { ProfStatusProps } from './UserStatusChip.type'
import { gerUserStatusChipColor } from './UserStatusChip.helpers'
import { Chip } from '@mui/material'

function userStatusChip({ status }: ProfStatusProps) {
  const { t } = useTranslation()
  const { label, color } = gerUserStatusChipColor(status)
  return (
    <Chip
      label={t(label)}
      color={color}
      variant="filled"
      sx={{ WebkitTextFillColor: 'white' }}
    />
  )
}

export default userStatusChip
