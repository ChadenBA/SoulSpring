import CustomPagination from '@components/customPagination/CustomPagination';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import AllCoursesList from '@pages/dashboard/student/courses/allCoursesList/AllCoursesList';
import { useGetEnrolledCoursesQuery } from '@redux/apis/courses/coursesApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from 'src/hooks/useDebounce';
import usePagination from 'src/hooks/usePagination';
import { RootState } from '@redux/store';
import SearchSection from '@features/courses/searchSection/SearchSection';

function EnrolledCoursesList() {
  const { queryParams, handlePageChange, handleRowsPerPageChange, handleSearchChange } =
    usePagination();

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  );

  const { isLoading, data } = useGetEnrolledCoursesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  });

  const searchQuery = useSelector((state: RootState) => state.appSlice.searchQuery);

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery);
    }
  }, [searchQuery]);

  return (
    <>
      <SearchSection handleSearchChange={handleSearchChange} searchValue={queryParams.keyword} />
      <AllCoursesList isLoading={isLoading} courses={data?.data} />
      {(data?.data?.length ?? 0) > 0 && (
        <CustomPagination
          page={queryParams.page}
          count={data?.meta.count || 0}
          rowsPerPage={queryParams.perPage}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </>
  );
}
export default EnrolledCoursesList;
