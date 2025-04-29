import { BLUE } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Chip, TableCell, styled } from '@mui/material'

export const StyledWarningChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.main,
  border: `1px solid ${theme.palette.warning.main}`,
}))

export const StyledTitleCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.mode === ThemeModeEnum.LIGHT ? BLUE.main : BLUE.light,
  fontWeight: 'medium',
  fontSize: '16px',
  '&:hover': {
    textDecoration: 'underline',
  },
  cursor: 'pointer',
}))
