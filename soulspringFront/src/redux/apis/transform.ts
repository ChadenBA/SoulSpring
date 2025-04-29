import { Media, MediaApi } from 'types/models/Media';
import { ApiPaginationResponse } from './type';
import { generatePictureSrc } from '@utils/helpers/string.helpers';
import { transformSingleUser } from './user/usersApi.transform';
import { UpdateResponse, UpdateResponseApi ,UserApi} from './user/usersApi.type';
import { UpdateProResponse, UpdateProResponseApi } from './Professional/ProfessionalApiType';
import { transformSinglePro } from './Professional/ProfessionalApi.transform';

export const transformMedia = (medias: MediaApi[]): Media[] => {
  return medias?.map((media) => transformSingleMedia(media));
};

export const transformSingleMedia = (media: MediaApi): Media => {
  return {
    id: media?.id,
    fileName: generatePictureSrc(media?.file_name),
    modelId: media?.model_id,
    mimeType: media?.mime_type,
    modelType: media?.model_type,
    title: media?.title,
    isSupplementary: media?.is_supplementary === 0 ? false : true,
  };
};

export function transformPaginationResponse<T>(paginationResponse: ApiPaginationResponse<T>) {
  const { message, meta } = paginationResponse;
  const { current_page, per_page, total } = meta;
  return {
    message: message,
    meta: {
      currentPage: current_page,
      perPage: per_page,
      total: total,
      count: Math.ceil(total / per_page),
    },
  };
}
//decodeUpdateResponse transforme les données reçues en un format utilisable par l'application.
export const decodeUpdateResponse = (response: UpdateResponseApi): UpdateResponse => {
  const userData: UserApi = response.user || response.data; // Priorité à `user`
  console.log("Données utilisateur API :", userData);
  if (!userData) {
    throw new Error("Réponse API invalide : ni 'user' ni 'data' trouvés !");
  }

  return {
    message: response.message,
    user: transformSingleUser(userData), // Correct car `userData` est de type `UserApi`
  };
};


export const decodeProUpdateResponse = (response: UpdateProResponseApi): UpdateProResponse => {
  return {
    message: response.message,
    data: transformSinglePro(response.data),
  };
};