import { Stack } from '@mui/material';
import { CourseCardMediaProps } from './courseMediaCard.type';
import { StyledCardMedia } from './courseCardMedia.style';
import { CardRoot } from '@pages/courses/courses.style';
import { useTranslation } from 'react-i18next';
import { getUserFromLocalStorage } from '@utils/localStorage/storage';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@config/constants/paths';
import { BuyButton, CourseImageContainer } from '@features/courses/coursesCard/professionalCard.style';

const CourseMediaCard = ({ image, isEnrolled, handleEnroll }: CourseCardMediaProps) => {
  const user = !!getUserFromLocalStorage();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <CardRoot>
      <CourseImageContainer>
        <StyledCardMedia src={image} alt="Course image" />
      </CourseImageContainer>
      <Stack p={2} sx={{ zIndex: 999 }}>
        {!isEnrolled && (
          <BuyButton
            onClick={
              user ? handleEnroll : () => navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
            }
            variant="outlined"
            color="primary"
          >
            {t('home.enroll_button')}
          </BuyButton>
        )}
      </Stack>
    </CardRoot>
  );
};
export default CourseMediaCard;
