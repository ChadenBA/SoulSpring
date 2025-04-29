import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { useGetPendingProsQuery } from '@redux/apis/Professional/ProfessionalApi'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'
import { UserTableHeaders } from '../allUsersTable/AllUsersTable.constants'
import PendingProfRow from './pendingUsersRow/PendingUsersRow'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function PendingProfsTable() {
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

  const { isFetching, data, isLoading } = useGetPendingProsQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  console.log(data)
  return (
    <Stack direction={'column'} spacing={2}>
    <CustomTable
      hasSearch
      columns={UserTableHeaders}
      isLoading={isLoading}
      isFetching={isFetching}
      queryParams={queryParams}
      handleSearchChange={handleSearchChange}>
      {data?.data?.map((professional) => (
        <PendingProfRow key={professional.id} professional={professional} />
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

export default PendingProfsTable
