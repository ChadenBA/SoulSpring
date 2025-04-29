import { HeaderContainer, HeaderContent, StyledHeaderImage } from './hero.style';
import { useTranslation } from 'react-i18next';

import header from '@assets/images/header.png';
import courses from '@assets/images/diagnose.png'
import online from '@assets/images/forum.png';
import teachers from '@assets/images/innovation.png';
import star from '@assets/images/star.png';

import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import StatsticsCard from './statisticsCard/StatisticsCard';
import { StatsCardsContainer } from './statisticsCard/statisticsCard.style';
import { Button, Stack } from '@mui/material';
import { BLUE } from '@config/colors/colors';
import { PATHS } from '@config/constants/paths';
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <h1>{t('home.title')}</h1>
          <h2>{t('home.description')}</h2>
          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} sx={{ color: BLUE.main }} alignItems={'center'} spacing={2}>
              <img src={star} alt="star" width={20} height={20} />
              <h3>{t('home.hero_description_1')}</h3>
            </Stack>
            <Stack direction={'row'} sx={{ color: BLUE.main }} alignItems={'center'} spacing={2}>
              <img src={star} alt="star" width={20} height={20} />
              <h3>{t('home.hero_description_2')}</h3>
            </Stack>
            <Stack direction={'row'} sx={{ color: BLUE.main }} alignItems={'center'} spacing={2}>
              <img src={star} alt="star" width={20} height={20} />
              <h3>{t('home.hero_description_3')}</h3>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: 'white',
              width: '200px',
              padding: '10px',
              marginTop: '20px',
            }}
            onClick={() =>
              navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`, {
                replace: true,
              })
            }
          >
            {t('home.get_started')}
          </Button>
        </HeaderContent>
        <Stack m={2}>
          <StyledHeaderImage src={header} alt={GLOBAL_VARIABLES.APP_NAME} />
        </Stack>
      </HeaderContainer>
      <Stack direction={'column'} m={2} justifyContent={'center'} alignItems={'center'}>
        <h2>{t('home.how_does_work')}</h2>
      </Stack>
      <StatsCardsContainer columnGap={2}>
        <StatsticsCard image={courses} label={t('home.Mental_Check')} />
        <StatsticsCard isBlue image={teachers} label={t('home.Tailored_solutions')} />
        <StatsticsCard image={online} label={t('home.Community_Support')} />
      </StatsCardsContainer>
    </>
  );
}
