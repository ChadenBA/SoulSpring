import { Button, Stack } from '@mui/material';

import { useTranslation } from 'react-i18next';

import Title from '@components/typographies/title/Title';
import { DescriptionStyled } from '@components/typographies/description/description.style';

import notFound from '@assets/images/notfound.gif';
import { PATHS } from '@config/constants/paths';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { UserRoleEnum } from '@config/enums/role.enum';

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Stack justifyContent={'center'} alignItems={'center'} p={16} spacing={4}>
      <img src={notFound} alt={t('home.page_not_found')} width={300} />
      <Title>{t('home.page_not_found')}</Title>
      <DescriptionStyled>{t('home.page_not_found_description')}</DescriptionStyled>
      <Button
        variant="contained"
        sx={{ borderRadius: '10px', color: 'white' }}
        onClick={() =>
          user?.role === undefined
            ? navigate(PATHS.ROOT)
            : user?.role === UserRoleEnum.USER
            ? navigate(PATHS.DASHBOARD.STUDENT.ROOT)
            : navigate(PATHS.DASHBOARD.ADMIN.ROOT)
        }
      >
        {t('common.go_back_home')}
      </Button>
    </Stack>
  );
}

export default NotFound;
