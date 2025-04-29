import { transformPaginationResponse } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { SingleProResponseData, ProfessionalApi } from './ProfessionalApiType';
import { Professional } from 'types/models/Prof';
import { toSnakeCase } from '@utils/helpers/string.helpers';
import noUser from '@assets/images/noUser.png';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';

// Transform API response to handle paginated results

export const transformFetchProResponse = (
  response: ApiPaginationResponse<ProfessionalApi>
): PaginationResponse<Professional> => {
  console.log("Raw API Response:", response); // Log the raw response
  
  // Assuming response.data is the array of professionals
  const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
  
  return {
    message: response.message || "No message provided", // Provide a default message
    data: transformPros(data), // Transform the data
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: data.length, // Set total based on the length of the data array
      count: data.length, // Set count based on the length of the data array
    },
  };
};
// Ensure that the data exists and handle fallback gracefully
export const transformProResponse = (
  response: SingleProResponseData,
): ItemDetailsResponse<Professional> => {
  console.log("API Response:", response); // Debugging
  console.log("Prof Data:", response.data); // Corrected reference

  // Ensure response.data exists before processing
  if (!response.data) {
    console.error("Error: User data is undefined", response);
    return {
      message: response.message || "No data received",
      data: null,
    };
  }

  return {
    message: response.message,
    data: transformSinglePro(response.data), // Corrected reference
  };
};

// Handle cases where the response data might be null or undefined
const transformPros = (data: ProfessionalApi[]): Professional[] => {
  if (!Array.isArray(data)) {
    console.error("Error: Data is not an array", data);
    return []; // Return an empty array if data is invalid
  }

  return data.map((professional) => transformSinglePro(professional));
};

// Transform a single professional object
export const transformSinglePro = (data: ProfessionalApi): Professional => {
  return {
    id: data._id,
    name: data.name , // Provide fallback for missing data
    lastname: data.lastname ,
    email: data.email ,
    password: data.password ,
    profilePicture: data.profilePicture?.url, 
    contact: data.contact ,
    description: data.description ,
    specialite: data.specialite ,
    isApproved: data.isApproved , 
    role:data.role,
    age:data.age,
    isSuspended: data.isSuspended,
    address:data.address,
  };
};


// Encode professional form data to FormData
export const encodePro = (values: FieldValues): FormData => {
  const formData = new FormData();

  if (values.profilePicture) {
    formData.append('profile_picture', values.profilePicture);
  }

  // Convert all fields to snake_case and append to FormData
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      formData.append(toSnakeCase(key), values[key]);
    }
  });

  return formData;
};
