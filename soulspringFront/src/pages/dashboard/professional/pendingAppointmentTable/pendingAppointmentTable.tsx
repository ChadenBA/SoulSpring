import CustomTable from '@components/customTable/CustomTable';
import { Stack } from '@mui/material';
import usePagination from 'src/hooks/usePagination';
import CustomPagination from '@components/customPagination/CustomPagination';
import { AppointmentTableHeaders } from '../AllApointment/AllAppointmentTable';
import PendingAppointmentRow from './pendingAppointmentRow/pendingAppointmentRow';
import useDebounce from 'src/hooks/useDebounce';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { useGetPendingAppointmentQuery } from '@redux/apis/Appointement/AppointmentApi';

function PendingAppointmentTable() {
    console.log('PendingAppointmentTable Loaded');
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination();

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  );

  const { isFetching, data, isLoading, error } = useGetPendingAppointmentQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
    //status: 'pending',
  });

  console.log('PendingAppointmentTable - isFetching:', isFetching);
  console.log('PendingAppointmentTable - isLoading:', isLoading);
  console.log('PendingAppointmentTable - data:', data);
  console.log('PendingAppointmentTable - error:', error);

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        hasSearch
        columns={AppointmentTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}
      >
        {data?.data?.map((Appointment) => {
          console.log('Mapping Appointment:', Appointment);
          return <PendingAppointmentRow key={Appointment.id} Appointment={Appointment} />;
        })}
      </CustomTable>
      {data?.data && data.data.length > 0 && (
  <CustomPagination
    page={queryParams.page}
    count={data?.meta?.count || 0}
    rowsPerPage={queryParams.perPage}
    isLoading={isLoading}
    handlePageChange={handlePageChange}
    handleRowsPerPageChange={handleRowsPerPageChange}
  />
)}
    </Stack>
  );
}

export default PendingAppointmentTable;