import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  styled,
  Button,
  Stack,
} from '@mui/material'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { ThemeModeEnum } from '@config/enums/theme.enum'
import { BLUE } from '@config/colors/colors'

export const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    marginBottom: 0,
  },
  marginBottom: 30,
  justifyContent: 'space-between',
})

export const StyledAccordionSummary = styled(AccordionSummary)({
  borderRadius: 20,
  '&.Mui-expanded': {
    minHeight: '60px',
  },
})

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  flexDirection: 'column',
  background: theme.palette.common.white,
}))

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const StyledExpandIcon = styled(KeyboardArrowDownOutlinedIcon)(
  () =>
    ({ isopened }: { isopened: string }) => ({
      transform:
        isopened === GLOBAL_VARIABLES.TRUE_STRING
          ? 'rotate(180deg)'
          : 'rotate(0deg)',
      transition: 'transform 0.2 ease-in',
    }),
)

export const StyledButton = styled(Button)({
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'inherit',
    textDecoration: 'none',
  },
})

export const StyledMediaSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  background:
    theme.palette.mode === ThemeModeEnum.DARK
      ? theme.palette.background.paper
      : BLUE.light,
  borderRadius: '5px',
  cursor: 'pointer',
}))
