import { Grid, Stack, Typography } from '@mui/material';
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style';
import Header from '@components/header/Header';
import SearchSection from '@features/courses/searchSection/SearchSection';

import CustomPagination from '@components/customPagination/CustomPagination';
import usePagination from 'src/hooks/usePagination';
import { useGetProfCardQuery } from '@redux/apis/Professional/ProfessionalApi';
import useDebounce from 'src/hooks/useDebounce';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@redux/store';
import { useTranslation } from 'react-i18next';
import CoursesList from '@features/courses/coursesList/CoursesList';
import FilterHeader from '@features/courses/filterSection/filterHeader/FilterHeader';

const Courses = () => {
  const {
    queryParams,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleResetFilters,
    handleFiltersRangeChange,
  } = usePagination();

  const { t } = useTranslation();

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  );

  const { data, isFetching } = useGetProfCardQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  });

  const searchQuery = useSelector((state: RootState) => state.appSlice.searchQuery);

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery);
    }
  }, [searchQuery]);
  console.log('Data:', data);

  /// Vérification si la recherche n'a pas donné de résultats
  const hasResults = data?.data && data.data.length > 0; // Vérification des résultats
  const noResultsMessage = !isFetching && !hasResults && debouncedSearchQuery !== '';


  return (
    <StackWithBackground>
      <Header />
      <FilterHeader
        isCoursePage
        hasFilter
        total={data?.meta.total as number}
        handleOrderChange={handleSortChange}
        queryParams={queryParams}
        handleFiltersRangeChange={handleFiltersRangeChange}
      />

      <Stack alignItems={'flex-end'} mr={2}>
        <Typography
          color="primary"
          fontWeight="medium"
          onClick={handleResetFilters}
          sx={{ cursor: 'pointer' }}
        >
          {t('pagination.reset_filters')}
        </Typography>
      </Stack>
      <Grid container mt={4}>
        <Grid item lg={9}>


          {/* Affichage du message si aucun résultat n'est trouvé */}
          {noResultsMessage ? (
            <Typography variant="h6" color="textSecondary">
              {t('home.no_prof_found_by_search')}  {/* Le texte que vous souhaitez afficher */}
            </Typography>
          ) : (
            <> 
          <CoursesList isLoading={isFetching} prof={data?.data} />
          <Stack direction={'row'} justifyContent={'center'} mt={4}>
            <CustomPagination
              page={queryParams.page}
              count={data?.meta.count}
              isLoading={isFetching}
              handlePageChange={handlePageChange}
            />
          </Stack>
          </>
          )}
        </Grid>

        <Grid item lg={3}>
          <Stack p={2}>
            <SearchSection
              handleSearchChange={handleSearchChange}
              searchValue={queryParams.keyword}
            />
          </Stack>
        </Grid>
      </Grid>
    </StackWithBackground>
  );
};

export default Courses;
//ajouter une alerte si aucun prof ne correspond au recherche