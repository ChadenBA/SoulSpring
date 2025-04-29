import { styled } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';

export const StyledAppointmentCardRoot = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
}));

export const StyledAppointmentCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

export const StyledAppointmentCardContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
}));

export const StyledAppointmentCardFooter = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
}));

export const FooterActions = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

export const ProfessionalInfoWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
}));

export const ProfessionalAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
}));

export const ProfessionalName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));
