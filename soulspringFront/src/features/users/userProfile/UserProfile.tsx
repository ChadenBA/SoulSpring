import Error from '@components/error/Error';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { Grid, Stack, Paper } from '@mui/material';
import { useGetUserProfileQuery } from '@redux/apis/user/usersApi';
import { useTranslation } from 'react-i18next';
import { StyledSubTitle, StyledTitle } from './UserProfile.style';
import { useAppSelector } from '@redux/hooks';
import { UserRoleEnum } from '@config/enums/role.enum';

function UserProfile() {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetUserProfileQuery();

  const user = useAppSelector((state) => state.auth.user);

  if (isError) return <Error />;

  if (isLoading) return <FallbackLoader />;

  return (
    <Grid container p={4} spacing={4}>
      {/* User Details */}
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <StyledTitle variant="h4" color="primary">{t('auth.first_name')}</StyledTitle>
            <StyledSubTitle variant="body1">{data?.user?.firstName}</StyledSubTitle>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <StyledTitle variant="h4" color="primary">{t('auth.last_name')}</StyledTitle>
            <StyledSubTitle variant="body1">{data?.user?.lastName}</StyledSubTitle>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <StyledTitle variant="h4" color="primary">{t('auth.email')}</StyledTitle>
            <StyledSubTitle variant="body1">{data?.user?.email}</StyledSubTitle>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          <Stack spacing={2}>
            <StyledTitle variant="h4" color="primary">{t('auth.registration_date')}</StyledTitle>
            <StyledSubTitle variant="body1">{data?.user?.createdAt}</StyledSubTitle>
          </Stack>
        </Paper>
      </Grid>

      {/* Conditional Sections for PROFESSIONAL Role */}
      {user?.role === UserRoleEnum.PROFESSIONAL && (
        <>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <StyledTitle variant="h4" color="primary">{t('auth.contact')}</StyledTitle>
                <StyledSubTitle variant="body1">{data?.user?.contact}</StyledSubTitle>
              </Stack>
              
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <StyledTitle variant="h4" color="primary">{t('auth.specialite')}</StyledTitle>
                <StyledSubTitle variant="body1">{data?.user?.specialite}</StyledSubTitle>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <StyledTitle variant="h4" color="primary">{t('address')}</StyledTitle>
                <StyledSubTitle variant="body1">{data?.user?.address}</StyledSubTitle>
              </Stack>
            </Paper>
          </Grid>
       
          
          {/* Description Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <StyledTitle variant="h4" color="primary">{t('auth.description')}</StyledTitle>
                <StyledSubTitle variant="body1">{data?.user?.description}</StyledSubTitle>
              </Stack>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default UserProfile;
