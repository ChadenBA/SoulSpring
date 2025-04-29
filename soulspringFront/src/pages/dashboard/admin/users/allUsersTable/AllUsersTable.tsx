import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { useGetProfsForAdminQuery } from '@redux/apis/Professional/ProfessionalApi'
import usePagination from 'src/hooks/usePagination'
import { AllUserTableHeaders } from './AllUsersTable.constants'
import AllUsersRow from './allUsersRow/AllUsersRow'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import useDebounce from 'src/hooks/useDebounce'

function AllProfsTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isFetching, data, isLoading } = useGetProfsForAdminQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        hasSearch
        columns={AllUserTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((professional) => (
          <AllUsersRow key={professional.id} professional={professional} />
        ))}
      </CustomTable>
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
    </Stack>
  )
}

export default AllProfsTable
