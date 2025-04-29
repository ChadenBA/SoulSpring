import { StyledCategoriesButton } from '@components/buttons/customCategoriesButton/CustomCategoriesButton.style';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { PATHS } from '@config/constants/paths';
import { Button, Stack, Typography } from '@mui/material';
import ForbiddenPage from '@pages/forbidden/ForbiddenPage';
import { useGetUserSubcategoriesQuery } from '@redux/apis/categories/categoriesApi';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

function SubcategoriesChoicePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { categoryId } = useParams();

  const categoryIdNumber = parseInt(categoryId as string, 10);

  const {
    data: subcategoriesData,
    isLoading: isLoadingCategories,
    isError,
  } = useGetUserSubcategoriesQuery(categoryIdNumber);

  if (isLoadingCategories) {
    return <FallbackLoader />;
  }
  const handleSubcategoryClick = (subcategoryId: number) => {
    navigate(`${PATHS.SECOND_STEP.COURSES_USER}/${subcategoryId}`);
  };

  if (isError) {
    return <ForbiddenPage />;
  }

  return (
    <Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} m={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate('/second-step/categories');
          }}
        >
          {t('common.back')}
        </Button>
      </Stack>
      <Typography variant="h1" sx={{ alignSelf: 'center', color: 'primary.main', marginTop: 2 }}>
        {t('home.choose_subcategory')}
      </Typography>
      <Stack
        direction="row"
        gap={4}
        sx={{
          margin: '50px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {subcategoriesData?.data.map((category) => (
          <StyledCategoriesButton
            variant="outlined"
            key={category.id}
            onClick={() => handleSubcategoryClick(category.id)}
          >
            {category.title}
          </StyledCategoriesButton>
        ))}
      </Stack>
    </Stack>
  );
}

export default SubcategoriesChoicePage;
