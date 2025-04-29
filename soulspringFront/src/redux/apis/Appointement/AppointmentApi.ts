import { createApi } from '@reduxjs/toolkit/query/react';
import { MethodsEnum } from '@config/enums/method.enum';
import { ENDPOINTS } from '@config/constants/endpoints';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { Appointment } from 'types/models/Appointment';
import { ApiPaginationResponse } from '../type';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { FieldValues } from 'react-hook-form';
import {transformFetchAppointmentResponse} from './AppointmentApi.transform';
import {AppointmentApi} from './AppointmentApi.type';
import { QueryParams } from 'types/interfaces/QueryParams';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';

export const appointmentApi = createApi({
  reducerPath: 'AppointmentApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    // 📦 GET : Liste paginée des rendez-vous
    // getAppointments: builder.query<PaginationResponse<Appointment>, { page: number; limit: number }>({
    //   query: ({ page, limit }) => ({
    //     url: injectPaginationParamsToUrl(ENDPOINTS.GET_APPOINTMENTS, { page, limit }),
    //     method: MethodsEnum.GET,
    //   }),
    //   transformResponse: (response: ApiPaginationResponse<Appointment>) => ({
    //     message: response.message || 'Aucun rendez-vous trouvé',
    //     data: response.data || [],
    //     meta: response.meta,
    //   }),
    //   providesTags: ['Appointments'],
    // }),

    // 🆕 POST : Création d’un rendez-vous
    createAppointment: builder.mutation<Appointment, FieldValues>({
      query: (newAppointment) => ({
        url: ENDPOINTS.CREATE_APPOINTMENT,
        method: MethodsEnum.POST,
        body: newAppointment,
      }),
      invalidatesTags: ['Appointments'],
    }),



     getPendingAppointment: builder.query<PaginationResponse<Appointment>, QueryParams>({
            query: (params) => ({
              url: injectPaginationParamsToUrl(ENDPOINTS.GET_PENDING_APPOINTMENT, params),
              method: MethodsEnum.GET,
            }),
            transformResponse: (response: ApiPaginationResponse<AppointmentApi>) =>
              transformFetchAppointmentResponse(response),
            providesTags: ['Appointments'],
          }),

          confirmerAppointment: builder.mutation<ItemDetailsResponse<Appointment>, number>({
                query: (id) => ({
                  url: `${ENDPOINTS.CONFIRM_APPOINTMENT}/${id}`,
                   method: MethodsEnum.POST,
                 }),
                 invalidatesTags: ['Appointments'],
               }),
          
               // reject prof
              CancealAppointment: builder.mutation<ItemDetailsResponse<Appointment>, number>({
             query: (id) => ({
                  url: `${ENDPOINTS.CANCELL_APPOINTMENT}/${id}`,
                 method: MethodsEnum.POST,
                }),
                invalidatesTags: ['Appointments'],
               }),



    // 📄 GET : Récupérer un rendez-vous par ID
    // getAppointmentById: builder.query<Appointment, string>({
    //   query: (id) => ({
    //     url: `${ENDPOINTS.GET_APPOINTMENT_BY_ID}/${id}`,
    //     method: MethodsEnum.GET,
    //   }),
    //   providesTags: ['Appointments'],
    // }),
  }),
});

export const {
 // useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useGetPendingAppointmentQuery,
  useCancealAppointmentMutation,
  useConfirmerAppointmentMutation,
 // useGetAppointmentByIdQuery,
} = appointmentApi;
