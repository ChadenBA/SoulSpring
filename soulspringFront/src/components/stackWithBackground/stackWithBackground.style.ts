import { DARK_COLORS } from '@config/colors/colors'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { styled, Stack } from '@mui/material'

export const StackWithBackground = styled(Stack)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === ThemeModeEnum.DARK
      ? DARK_COLORS.background.default
      : '#fafafa',
}))
