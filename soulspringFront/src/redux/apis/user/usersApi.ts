import { User } from 'types/models/User';
import { ENDPOINTS } from '@config/constants/endpoints';
import { baseQueryConfigWithRefresh } from '@redux/baseQueryConfig';

import { MethodsEnum } from '@config/enums/method.enum';
import {
  SingleUserResponseData,
  UpdateResponse,
  UpdateResponseApi,
} from './usersApi.type';
import {
  encodeUser,EncodeUser,
  transformUserResponse,
} from './usersApi.transform';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { FieldValues } from 'react-hook-form';
import { decodeUpdateResponse } from '../transform';

// Définition de l'API utilisateur avec RTK Query
export const userApi = createApi({
  reducerPath: 'userApi', // Nom du slice dans le store Redux
  baseQuery: baseQueryConfigWithRefresh, // Configuration de la requête avec gestion du rafraîchissement du token
  tagTypes: ['Users', 'User', 'Profile'], // Définition des tags pour l'invalidation du cache
  endpoints: (builder) => ({
    
    // Récupérer un utilisateur par son ID
    getUserById: builder.query<ItemDetailsResponse<User>, string>({
      query: (id) => ({
        url: `${ENDPOINTS.USERS}/${id}`,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleUserResponseData) => transformUserResponse(response),
      providesTags: ['User'],
    }),

    // Modifier un utilisateur existant
    editUser: builder.mutation<void, { id: number; user: FieldValues }>({
      query: ({ id, user }) => ({
        url: `${ENDPOINTS.UPDATE_PROFILE}/${id}`,
        method: MethodsEnum.PUT,
        body: encodeUser(user),
      }),
      invalidatesTags: ['Users', 'User'], // Invalide le cache après modification
    }),

    // Supprimer un utilisateur
    deleteUser: builder.mutation<ItemDetailsResponse<User>, number>({
      query: (id) => ({
        url: `${ENDPOINTS.DELETE_USER}/${id}`,
        method: MethodsEnum.DELETE,
      }),
      invalidatesTags: ['Users'], // Rafraîchir la liste des utilisateurs après suppression
    }),

    // Récupérer le profil de l'utilisateur connecté
    getUserProfile: builder.query<ItemDetailsResponse<User>, void>({
      query: () => ({
        url: ENDPOINTS.USER_PROFILE,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleUserResponseData) => transformUserResponse(response),
      providesTags: ['Profile'],
    }),

    getAllUsers: builder.query<ItemDetailsResponse<User>, string>({
      query: () => ({
        url: ENDPOINTS.GET_ALL_USERS,
        method: MethodsEnum.GET,
      }),
      transformResponse: (response: SingleUserResponseData) => transformUserResponse(response),
      providesTags: ['User'],
    }),


    // Mettre à jour le profil de l'utilisateur connecté
    updateProfile: builder.mutation<UpdateResponse, FieldValues>({
      query: (user) => {
        console.log("Données utilisateur envoyées :", user); 
        // Ajoutez le log ici pour voir les données envoyées à l'API
        console.log("Données encodé envoyées à l'API :", EncodeUser(user)); // Vérifiez les données envoyées
        return {
          url: `${ENDPOINTS.UPDATE_PROFILE}/${user.id}`, // Assurez-vous que data.id est défini
          method: MethodsEnum.PUT,
          body: EncodeUser(user), // Assurez-vous que vous passez les bonnes données dans le corps de la requête
        };
      },
      transformResponse: (response: UpdateResponseApi): UpdateResponse => {
        console.log("Réponse API brute :", response);
        return decodeUpdateResponse(response);
      },
      invalidatesTags: ['Profile'], // Rafraîchir le profil après mise à jour
    }),
  }),

});

// Export des hooks générés automatiquement pour l'utilisation des requêtes dans les composants
export const {
  useGetUserByIdQuery,
  //useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = userApi;
