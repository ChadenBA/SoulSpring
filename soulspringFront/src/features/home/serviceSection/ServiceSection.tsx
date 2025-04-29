import Bloc from '@components/bloc/Bloc';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import learning from '@assets/images/share.png';
import { ImageService } from './serviceSection.style';

function ServiceSection() {
  const { t } = useTranslation();
  return (
    <Stack
      direction={{ sm: 'column', md: 'row' }}
      marginTop={'100px'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <ImageService src={learning} />
      <Bloc title={t('home.share_knowledge')} hasButton={true} />
    </Stack>
  );
}

export default ServiceSection;
