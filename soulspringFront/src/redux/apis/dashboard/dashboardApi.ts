import { ENDPOINTS } from '@config/constants/endpoints';
import { MethodsEnum } from '@config/enums/method.enum';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { createApi } from '@reduxjs/toolkit/query/react';
import { AdminDashboardApi, ProfessionalDashboardApi } from './dashboardApi.type';
import { transformAdminDashboard, transformProfessionalDashboard } from './dashboardApi.transform';
import { AdminDashboard } from 'types/models/Dashboard';



export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryConfigWithRefresh,
  endpoints: (builder) => ({
    // getStudentStatistics: builder.query<StudentDashboard, void>({
    //   query: () => ({
    //     url: ENDPOINTS.STUDENT_DASHBOARD,
    //     method: MethodsEnum.GET,
    //   }),
    //   transformResponse: (response: StudentDashboardApi) => transformStudentDashboard(response),
    // }),
    
    getAdminStatistics: builder.query<AdminDashboard, void>({
      query: () => ({
        url: ENDPOINTS.ADMIN_DASHBOARD,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: AdminDashboardApi) => {
        console.log(response); // Add this to inspect the response structure
        return transformAdminDashboard(response);
      },    }),


      getProStatistics: builder.query<ProfessionalDashboardApi, void>({
        query: () => ({
          url: ENDPOINTS.GET_PRO_DASHBOARD,
          method: MethodsEnum.GET,
        }),
        transformResponse: (response: ProfessionalDashboardApi) => {
          console.log(response); // Add this to inspect the response structure
          return transformProfessionalDashboard(response);
        },    }),



  }),


  
});



export const {  useGetAdminStatisticsQuery ,
  useGetProStatisticsQuery

} = dashboardApi;
