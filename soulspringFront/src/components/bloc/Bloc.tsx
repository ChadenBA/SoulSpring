import { Button, Stack, Typography } from '@mui/material';
import { BlocSectionProps } from './bloc.type';
import { BlocContainer, FirstBloc, SecondBloc, ViewAllContainer } from './bloc.style';
import Title from '@components/typographies/title/Title';
import { useTranslation } from 'react-i18next';
import { PATHS } from '@config/constants/paths';
import { useNavigate } from 'react-router-dom';

function Bloc({ children, title, hasButton }: BlocSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <BlocContainer>
      <ViewAllContainer>
        <FirstBloc spacing={2}>
          <Title>{t(title)}</Title>
        </FirstBloc>
        <SecondBloc>
          {hasButton && (
            <Stack alignItems={'center'} spacing={4}>
              <Typography variant="h3" fontWeight={800} color={'#0A8EC7'}>
                {t('home.join')}
              </Typography>
              <Stack spacing={2} direction={'row'}>
                <Button
                  variant="contained"
                  sx={{ color: 'white' }}
                  onClick={() => {
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`);
                  }}
                >
                  {t('home.login')}
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: 'white', backgroundColor: '#0A8EC7' }}
                  onClick={() => {
                    navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`);
                  }}
                >
                  {t('home.sign_up')}
                </Button>
              </Stack>
            </Stack>
          )}
        </SecondBloc>
      </ViewAllContainer>
      <Stack alignItems={'center'}>{children}</Stack>
    </BlocContainer>
  );
}

export default Bloc;
