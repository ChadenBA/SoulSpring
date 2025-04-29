import { User } from 'types/models/User';
import { ENDPOINTS } from '@config/constants/endpoints';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';
import { injectPaginationParamsToUrl } from '@utils/helpers/queryParamInjector';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { QueryParams } from 'types/interfaces/QueryParams';
import { ApiPaginationResponse } from '../type';

import { MethodsEnum } from '@config/enums/method.enum';

import { FieldValues } from 'react-hook-form';

import { createApi } from '@reduxjs/toolkit/query/react';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
// import { transformRegisterResponse } from '../auth/authApi.transform';
// import { FieldValues } from 'react-hook-form';
// import { decodeUpdateResponse } from '../transform';
import { Professional } from 'types/models/Prof';
import { ProfessionalApi, UpdateProResponse, UpdateProResponseApi } from './ProfessionalApiType';
import { transformFetchProResponse } from './ProfessionalApi.transform';
import { encodeUser } from '../user/usersApi.transform';
import { decodeProUpdateResponse, decodeUpdateResponse } from '../transform';

export const professionalApi = createApi({
  reducerPath: 'professionalApi',
  baseQuery: baseQueryConfigWithRefresh,
  tagTypes: ['Professionals', 'Professional', 'Profile'],
  endpoints: (builder) => ({
  
    getProfsForAdmin: builder.query<PaginationResponse<Professional>, QueryParams>({
      query: (params) => ({
        url: injectPaginationParamsToUrl(ENDPOINTS.USERS, params),
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: ApiPaginationResponse<ProfessionalApi>) =>
        transformFetchProResponse(response),
      providesTags: ['Professionals'],
    }),

// valider prof 
 validateProf: builder.mutation<ItemDetailsResponse<Professional>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.VALIDATE_PROF}/${id}`,
         method: MethodsEnum.POST,
       }),
       invalidatesTags: ['Professionals'],
     }),

     // reject prof
    rejectProf: builder.mutation<ItemDetailsResponse<Professional>, number>({
   query: (id) => ({
        url: `${ENDPOINTS.REJECT_PROF}/${id}`,
       method: MethodsEnum.POST,
      }),
      invalidatesTags: ['Professionals'],
     }),

     // suspend prof 
     suspendProf: builder.mutation<ItemDetailsResponse<Professional>, number>({
       query: (id) => ({
        url: `${ENDPOINTS.SUSPEND_PROF}/${id}`,
         method: MethodsEnum.POST,
       }),
       invalidatesTags: ['Professionals'],
     }),

        // suspend prof 
        unsuspendProf: builder.mutation<ItemDetailsResponse<Professional>, number>({
          query: (id) => ({
           url: `${ENDPOINTS.UNSUSPEND_PROF}/${id}`,
            method: MethodsEnum.POST,
          }),
          invalidatesTags: ['Professionals'],
        }),
    // getPorProfile: builder.query<ItemDetailsResponse<Professional>, void>({
    //   query: () => ({
    //     url: ENDPOINTS.USER_PROFILE,
    //     method: MethodsEnum.GET,
    //   }),
    //   transformResponse: (response: SingleProResponseData) => transformUserResponse(response),
    //   providesTags: ['Profile'],
    // }),
    
    // delete  prof 

    deleteProf: builder.mutation<ItemDetailsResponse<Professional>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_USER}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Professionals'],
    }),

    getPendingPros: builder.query<PaginationResponse<Professional>, QueryParams>({
        query: (params) => ({
          url: injectPaginationParamsToUrl(ENDPOINTS.PENDING_Prof, params),
          method: MethodsEnum.GET,
        }),
        transformResponse: (response: ApiPaginationResponse<ProfessionalApi>) =>
          transformFetchProResponse(response),
        providesTags: ['Professionals'],
      }),
  
      
  
      getAcceptedPros: builder.query<PaginationResponse<Professional>, QueryParams>({
        query: (params) => ({
          url: injectPaginationParamsToUrl(ENDPOINTS.ACCEPTED_Prof, params),
          method: MethodsEnum.GET,
        }),
        transformResponse: (response: ApiPaginationResponse<ProfessionalApi>) =>
          transformFetchProResponse(response),
        providesTags: ['Professionals'],
      }),
  
  updateProfile: builder.mutation<UpdateProResponse, FieldValues>({
      query: (data) => ({
         url: ENDPOINTS.UPDATE_PROFILE,
         method: MethodsEnum.POST,
         body: encodeUser(data),
       }),
       transformResponse: (response: UpdateProResponseApi): UpdateProResponse =>
         decodeProUpdateResponse(response),
       invalidatesTags: ['Profile'],
     }),


     //for card prof
    getProfCard: builder.query<PaginationResponse<Professional>, QueryParams>({
          // Définition d'une requête (query) qui retourne une liste paginée de cours pour l'admin.
          query: (params) => ({
            // Construit l'URL de l'endpoint en injectant les paramètres de pagination (page, limit, etc.).
            url: injectPaginationParamsToUrl(ENDPOINTS.CARDPROF, params),
            method: MethodsEnum.GET, // Utilisation de la méthode GET pour récupérer les données.
          }),
          
          // Transformation de la réponse de l'API avant de l'envoyer au store Redux.
          transformResponse: (response: ApiPaginationResponse<ProfessionalApi>) =>
            transformFetchProResponse(response),
        
          // Permet d'associer cette requête au tag "Courses".
          // Ainsi, si une mutation modifie un cours, elle peut invalider ce tag et rafraîchir la liste.
          providesTags: ['Professionals'],
        }),


    //prof for rendez-vous
    getApprovedProfessionals: builder.query<Professional[], void>({
          query: () => ({
            url: ENDPOINTS.CARDPROF,
            method: MethodsEnum.GET,
          }),
          transformResponse: (response: { data: Professional[] }) => response.data,
        }), 
  }),

  


});

export const {
useSuspendProfMutation,
useGetProfsForAdminQuery,
useValidateProfMutation ,
useRejectProfMutation,
useGetAcceptedProsQuery,
useGetPendingProsQuery,
useDeleteProfMutation,
useGetProfCardQuery,
useUnsuspendProfMutation,
useGetApprovedProfessionalsQuery,
} = professionalApi;
