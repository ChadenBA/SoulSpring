import { transformPaginationResponse } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { SingleUserResponseData, UserApi } from './usersApi.type';
import { User } from 'types/models/User';
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers';
import noUser from '@assets/images/noUser.png';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import {
  convertFromUnixTimestampToDate,
  convertToUnixTimestamp,
  transformDateTime,
} from '@utils/helpers/date.helpers';
import { UserRoleEnum } from '@config/enums/role.enum';

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformUsers(Object.values(response.data)),
    };
  }
  return {
    message: response.message,
    data: transformUsers(Object.values(response.data)),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

export const transformUserResponse = (
  response: SingleUserResponseData,
): ItemDetailsResponse<User> => {
  console.log("API Response:", response); // Debugging
  console.log("User Data:", response.user); // Corrected reference

  if (!response.user) {
    console.error("Error: User data is undefined", response);
    return {
      message: response.message || "No data received",
      user: null, 
    };
  }

  return {
    message: response.message,
    user: transformSingleUser(response.user),
  };
};


const transformUsers = (data: UserApi[]): User[] => {
  return data.map((user) => transformSingleUser(user));
};

export const transformSingleUser = (data: UserApi): User => {
  return {
    id: data.id,
    firstName: data.name || '',
    lastName: data.lastname || '',
    email: data.email || '',
    role: data.role || '',
    age: data.age || 0 ,
    password: data.password || '',
    password_confirmation: data.password_confirmation || '',
    profilePicture: data.profilePicture,
    createdAt : data.createdAt,
    contact:data.contact,
    description: data.description,
    specialite : data.specialite,
    hasCompletedTest:data.hasCompletedTest,
    address:data.address || '', 
    isApproved: data.isApproved,

  };
};

export const EncodeUser = (values: FieldValues): FormData => {
  console.log("Données reçues dans EncodeUser :", values);  // Vérifie les valeurs reçues
  const formData = new FormData();
  
  if (values.profilePicture) {
    formData.append('profilePicture', values.profilePicture);
  }
  
  Object.keys(values).forEach((key) => {
    const value = values[key]; // Déclarer une seule fois
    // Loggage des données avant de les ajouter à FormData
    console.log(`Cléeeeeeee : ${key}, Valeur : ${value}`);
    if (value != null && value !== "") {
      formData.append(toSnakeCase(key), value instanceof File ? value : String(value));
    } else {
      console.log("Clé ignorée : ", key, "Valeur : ", value);
    }
  });
  
  formData.forEach((value, key) => {
    console.log(`CléduUUUUU form : ${key}, Valeur : ${value}`);
  });
  
  console.log("FormData final :", formData);  // Vérifie ce qui est ajouté dans FormData
  return formData;
};



export const encodeUser = (values: FieldValues) => {
  console.log("Valeurs reçues avant encodage :", values); // Vérifiez ici si les valeurs sont correctes
  return {
    //valeurs doivent etre comme le nom des champs dans postman
    id: values.id,  // L'ID de l'utilisateur
    lastName: values.lastName || "",  // Vérifiez que 'firstname' est utilisé dans le formulaire
    firstName: values.firstName || "",    // Utiliser 'lastname' comme nom du champ
    email: values.email || "",          // Utiliser 'email' comme nom du champ
    age: values.age || "",              // Utiliser 'age' comme nom du champ
    specialite: values.specialite || "",  // Utiliser 'specialite' comme nom du champ
    description: values.description || "",  // Utiliser 'description' comme nom du champ
    contact: values.contact || "",      // Utiliser 'contact' comme nom du champ
    hasCompletedTest:values.hasCompletedTest,
    address:values.address || "",

  };
};