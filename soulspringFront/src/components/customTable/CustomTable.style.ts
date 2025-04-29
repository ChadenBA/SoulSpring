import { GREY } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Stack, styled } from '@mui/material'

export const CustomTableRoot = styled(Stack)(({ theme }) => ({
  borderRadius: '5px',
  backgroundColor: theme.palette.background.default,
  border:
    theme.palette.mode === ThemeModeEnum.LIGHT
      ? `1px solid ${GREY.light}`
      : 'none',
  margin: '20px',
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    margin: '10px',
    width: 'auto',
  },
}))
