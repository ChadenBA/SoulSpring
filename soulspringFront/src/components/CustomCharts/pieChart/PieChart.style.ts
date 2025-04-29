import { GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { styled, Stack } from '@mui/material'

export const Container = styled(Stack)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? theme.palette.common.white
      : theme.palette.background.paper,
  borderRadius: 8,
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '350px',
  flexGrow: 1,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& .recharts-legend-wrapper': {
      display: 'block',
      justifyContent: 'flex-start',
      width: '100%',
    },
  },
}))
