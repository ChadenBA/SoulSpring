import { useTranslation } from 'react-i18next'
import { UserStatusProps } from './UserStatusChip.type'
import { gerProfStatusChipColor } from './UserStatusChip.helpers'

import { Chip } from '@mui/material'

function ProfStatusChip({ status }: UserStatusProps) {
  const { t } = useTranslation()
  const { label, color } = gerProfStatusChipColor(status)
  return (
    <Chip
      label={t(label)}
      color={color}
      variant="filled"
      sx={{ WebkitTextFillColor: 'white' }}
    />
  )
}

export default ProfStatusChip
