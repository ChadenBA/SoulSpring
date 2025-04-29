import { Box, Chip, Stack, Typography } from '@mui/material';
import { CourseHeaderProps } from './courseDetails.type';
import { useTranslation } from 'react-i18next';
import { HeaderBackgroundImage, HeaderDetail, HeaderOverlay } from './courseDetails.style';
import peopleIcon from '@assets/logo/people.svg';
import courseIcon from '@assets/logo/icon-01.svg';

const CourseHeader = ({
  title,
  background,
  learningObjectsCount,
  enrolledCount,
  category,
  subcategory,
}: CourseHeaderProps) => {
  const { t } = useTranslation();

  return (
    <Box position="relative">
      <HeaderBackgroundImage background={background} />

      <HeaderOverlay>
        <Typography variant="h1" sx={{ m: 2, fontSize: '40px', lineHeight: 1.2 }}>
          {title}
        </Typography>
        <HeaderDetail>
          <Stack direction={'row'} spacing={1}>
            <img src={peopleIcon} />
            <Typography>{t('course.enrolled_students', { count: enrolledCount })}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <img src={courseIcon} />
            <Typography>
              {t('course.number_of_lessons', { count: learningObjectsCount })}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Chip
              label={category}
              variant="filled"
              color="primary"
              sx={{ color: 'white' }}
              size="medium"
            />
            <Chip label={subcategory} variant="filled" color="secondary" size="medium" />
          </Stack>
        </HeaderDetail>
      </HeaderOverlay>
    </Box>
  );
};

export default CourseHeader;
