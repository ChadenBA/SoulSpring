import { useState, useEffect } from 'react';
import { useAppSelector } from '@redux/hooks';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams';

function usePagination() {
  const searchQuery = useAppSelector((state) => state.appSlice.searchQuery);

  const INITIAL_QUERY_PARAMS: QueryParams = {
    page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
    perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
    keyword: searchQuery ?? GLOBAL_VARIABLES.EMPTY_STRING,
    pagination: true,
    filters: [],
  };

  const [queryParams, setQueryParams] = useState<QueryParams>(INITIAL_QUERY_PARAMS);

  const handlePageChange = (newPage: number) => {
    setQueryParams({ ...queryParams, page: newPage });
    window.scrollTo(300, 300);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: newRowsPerPage,
    });
  };

  const handleSearchChange = (keyword: string) => {
    setQueryParams({ ...queryParams, keyword, page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE });
  };

  const handleFiltersChange = (filter: FiltersOption) => {
    const existingFilterIndex = queryParams.filters?.findIndex((f) => f.name === filter.name);
    const updatedFilters = queryParams.filters ? [...queryParams.filters] : [];

    if (existingFilterIndex !== undefined && existingFilterIndex !== -1) {
      updatedFilters[existingFilterIndex] = filter;
    } else {
      updatedFilters.push(filter);
    }

    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      filters: updatedFilters,
    });
  };

  const handleFiltersRangeChange = (filters: FiltersOption[]) => {
    const updatedFilters = queryParams.filters ? [...queryParams.filters] : [];

    filters.forEach((filter) => {
      const existingFilterIndex = updatedFilters.findIndex((f) => f.name === filter.name);
      if (existingFilterIndex !== -1) {
        updatedFilters[existingFilterIndex] = filter;
      } else {
        updatedFilters.push(filter);
      }
    });

    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      filters: updatedFilters,
    });
  };

  const handleSortChange = (direction: string, orderBy: string) => {
    setQueryParams({
      ...queryParams,
      page: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      direction,
      orderBy,
    });
  };

  const handleResetFilters = () => {
    setQueryParams({
      ...INITIAL_QUERY_PARAMS,
      keyword: GLOBAL_VARIABLES.EMPTY_STRING,
    });
  };

  useEffect(() => {}, [queryParams]);

  return {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
    handleFiltersChange,
    handleFiltersRangeChange,
    handleSortChange,
    handleResetFilters,
  };
}

export default usePagination;
