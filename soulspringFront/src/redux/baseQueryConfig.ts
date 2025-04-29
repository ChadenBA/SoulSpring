import { Mutex } from 'async-mutex'
import i18n from 'i18n'
import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react'
import {
  clearLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '@utils/localStorage/storage'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
import { ConfigEnv } from '@config/configEnv'
import { ENDPOINTS } from '@config/constants/endpoints'
import { MethodsEnum } from '@config/enums/method.enum'

// Configuration de la fonction `baseQueryConfig` qui définit la manière dont
// les requêtes sont envoyées au serveur en utilisant `fetchBaseQuery`
export const baseQueryConfig = (
  args: string | FetchArgs,  // Requête envoyée (string ou objet FetchArgs)
  api: BaseQueryApi,        // API à utiliser pour envoyer la requête
  extraOptions: {}          // Options supplémentaires pour la requête
) =>
  // `fetchBaseQuery` permet de définir les bases de la requête HTTP
  fetchBaseQuery({
    baseUrl: `${ConfigEnv.API_ENDPOINT}`,  // URL de base pour toutes les requêtes API
    prepareHeaders: (headers) => {
      // Récupère le token depuis le localStorage
      const token = getFromLocalStorage(LocalStorageKeysEnum.token);
      
      // Affiche le token dans la console pour débogage
      console.log(token);

      // Si un token est présent, on l'ajoute à l'en-tête Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Ajoute d'autres en-têtes pour accepter des réponses au format JSON
      headers.set('Accept', 'application/json');

      // Ajoute la langue préférée dans l'en-tête de la requête (utile pour i18n)
      headers.set('Accept-Language', i18n.language);

      // Retourne les en-têtes modifiés
      return headers;
    },
  })(args, api, extraOptions);  // Exécute la requête avec les arguments et options fournis

const mutex = new Mutex()
const refreshTokenBaseQuery = fetchBaseQuery({
  baseUrl: `${ConfigEnv.API_ENDPOINT}`,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json')
    headers.set('Accept-Language', i18n.language)
    headers.set(
      'Authorization',
      `Bearer ${getFromLocalStorage(LocalStorageKeysEnum.RefreshToken)}`,
    )
    return headers
  },
})

export const baseQueryConfigWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryConfig(args, api, extraOptions)
  // Si la réponse a un statut 401, on tente de rafraîchir le token
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await refreshTokenBaseQuery(
          {
            url: ENDPOINTS.REFRESH_TOKEN,
            method: MethodsEnum.POST,
            body: JSON.stringify({
              refresh_token: getFromLocalStorage(
                LocalStorageKeysEnum.RefreshToken,
              ),
            }),
          },
          api,
          extraOptions,
        )

        if (refreshResult.data) {
          setToLocalStorage(
            LocalStorageKeysEnum.token,
            (refreshResult.data as { data: { token: string } }).data
              .token,
          )
          result = await baseQueryConfig(args, api, extraOptions)
        } else {
          clearLocalStorage()
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQueryConfig(args, api, extraOptions)
    }
  }
  return result
}
