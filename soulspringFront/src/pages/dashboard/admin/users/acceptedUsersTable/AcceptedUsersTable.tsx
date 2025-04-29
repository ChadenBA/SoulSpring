import CustomTable from '@components/customTable/CustomTable';
import { Stack } from '@mui/material';
import usePagination from 'src/hooks/usePagination';
import CustomPagination from '@components/customPagination/CustomPagination';
import { UserTableHeaders } from '../allUsersTable/AllUsersTable.constants';
import AcceptedProsRow from './acceptedUsersRow/AcceptedProsRow';
import { useGetAcceptedProsQuery } from '@redux/apis/Professional/ProfessionalApi';
import useDebounce from 'src/hooks/useDebounce';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';

function AcceptedProsTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination();

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isFetching, data, isLoading } = useGetAcceptedProsQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })


  console.log("Query Params:", queryParams); // Log the query parameters

  // const { isFetching, data, isLoading, error } = useGetAcceptedProsQuery({
  //   page: 1,
  //   perPage: 100, // Increase the perPage to see if you get any results
  //   keyword: 'specific-search-term', // Test with a known search term
  //   pagination: false, // Disable pagination for this test
  //   filters: [], // No filters
    
  // });

  
  const dataList = data?.data || [];
  const meta = data?.meta || { count: 0 };

  console.log("API Response Data:", data); // Log the API response to debug

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        hasSearch
        columns={UserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}
      >
        {isLoading || isFetching ? (
          <div>Loading...</div>
        ) : dataList.length > 0 ? (
          dataList.map((professional) => (
            <AcceptedProsRow key={professional.id} professional={professional} />
          ))
        ) : (
          <div>No accepted professionals found.</div>
        )}
      </CustomTable>

      {dataList.length > 0 && (
        <CustomPagination
          page={queryParams.page}
          count={meta.count}
          rowsPerPage={queryParams.perPage}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      )}

    

      {dataList.length === 0 && !isLoading && !isFetching && !Error && (
        <div>No accepted professionals available at the moment.</div>
      )}
    </Stack>
  );
}

export default AcceptedProsTable;
