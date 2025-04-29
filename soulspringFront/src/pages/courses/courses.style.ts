import { GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, styled } from '@mui/material'

export const CardRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(1),
  background:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? theme.palette.common.white
      : theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  borderRadius: 5,
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  padding: 26,
  width: 'auto',
  margin: '16px 0',

  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))
