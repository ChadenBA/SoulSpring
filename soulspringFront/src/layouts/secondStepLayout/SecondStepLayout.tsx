import { TopBar } from '@components/topBar/Topbar';
import { ItemsMain } from '@components/topBar/topBarMenu';
import UserHeader from '@components/userHeader/UserHeader';
import getStarted from '@assets/images/images-removebg-preview (1).png';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function SecondStepLayout() {
  const { t } = useTranslation();

  return (
    <>
      <TopBar items={ItemsMain} />
      <UserHeader
        image={getStarted}
        title={t('home.get_started_title')}
        description={t('home.get_started_description')}
      />

      <Suspense fallback={<FallbackLoader />}>
        <Stack
          direction="column"
          spacing={2}
          width={'100%'}
          
        >
          <Outlet />
        </Stack>
      </Suspense>
    </>
  );
}

export default SecondStepLayout;
