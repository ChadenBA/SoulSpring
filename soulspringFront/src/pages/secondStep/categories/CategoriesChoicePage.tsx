import { StyledCategoriesButton } from '@components/buttons/customCategoriesButton/CustomCategoriesButton.style';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { PATHS } from '@config/constants/paths';
import { Stack, Typography } from '@mui/material';
import ForbiddenPage from '@pages/forbidden/ForbiddenPage';
import { useGetUserCategoriesQuery } from '@redux/apis/categories/categoriesApi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';

function CategoriesChoicePage() {
  const { queryParams } = usePagination();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError,
  } = useGetUserCategoriesQuery({
    ...queryParams,
    pagination: false,
  });

  if (isLoadingCategories) {
    return <FallbackLoader />;
  }

  const handleCategoryClick = (categoryId: number) => {
    navigate(`${PATHS.SECOND_STEP.CATEGORIES}/${categoryId}`);
  };

  if (isError) {
    return <ForbiddenPage />;
  }

  return (
    <Stack>
      <Typography variant="h1" sx={{ alignSelf: 'center', color: 'primary.main', marginTop: 2 }}>
        {t('home.choose_category')}
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
        {categoriesData?.data.map((category) => (
          <StyledCategoriesButton
            variant="outlined"
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.title}
          </StyledCategoriesButton>
        ))}
      </Stack>
    </Stack>
  );
}

export default CategoriesChoicePage;
