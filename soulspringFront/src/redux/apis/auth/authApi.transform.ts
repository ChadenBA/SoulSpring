import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { UserApi } from '../user/usersApi.type';
import { User } from 'types/models/User';
import { transformSingleUser } from '../user/usersApi.transform';
import { RegisterBody } from '@features/auth/signup/SignupForm.type';
import { LoginResponse, LoginResponseApi, RegisterBodyApi } from './authApi.type';
import { generatePictureSrc } from '@utils/helpers/string.helpers';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { convertToUnixTimestamp } from '@utils/helpers/date.helpers';
import { transformSinglePro } from '../Professional/ProfessionalApi.transform';

export const transformRegisterResponse = (
  response: ItemDetailsResponse<UserApi>,
): ItemDetailsResponse<User> => {
  if (!response?.user) {
    throw new Error("Invalid API response: user object missing");
}
  console.log("Signup API response:", response);

  return {
    ...response,
    user: transformSingleUser(response.user),
  };

};
export function signupEncoder(user: RegisterBody): RegisterBodyApi {
  const { firstName, lastName, email, password, role, age, profilePicture, password_confirmation, token, specialite, description, contact, isApproved, isSuspended, address } = user;

  // Create a FormData instance to send the data
  const formData = new FormData();

  // Append the fields from the user object
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("role", role);
  
  // Check if profilePicture is a File or an object containing the URL and publicId
  if (profilePicture && profilePicture instanceof File) {
    formData.append("profilePicture", profilePicture); // Append the File object
  } else if (profilePicture && profilePicture.url) {
    formData.append("profilePictureUrl", profilePicture.url); // Append the URL if no file
  }

  formData.append("contact", contact ? Number(contact) : 0);
  formData.append("specialite", specialite || '');
  formData.append("description", description || '');

  // Return the final data object in the required format
  return {
    name: firstName,
    lastname: lastName,
    email: email,
    age: age || 0,
    password: password,
    role: role,
    profilePicture: profilePicture,  // This will be the full profilePicture object or undefined
    password_confirmation: password_confirmation || '',
    token: token || '',
    specialite: specialite || '',
    description: description || '',
    contact: contact || 0,
    isApproved: isApproved || false,
    isSuspended: isSuspended || false,
    address: address || ''
  };
}


export function setPasswordEncoder(data: { password: string; passwordConfirmation: string }): {
  password: string;
  password_confirmation: string;
} {
  return {
    password: data.password,
    password_confirmation: data.passwordConfirmation,
  };
}





export function decodeLoginResponse(response: LoginResponseApi): LoginResponse {
  // Transform the user
  const userTransformed = transformSingleUser(response.user);

  // Check if the user is a professional and transform accordingly
 
  return {
    message: response.message,
    data: {
      token: response.token,  // Correct token assignment
      refreshToken: response.refreshToken,  // Correct refresh token assignment
      user: userTransformed,  // Transformed user
      contact: response.user.contact,  // Directly get contact from user data
      description: response.user.description,  // Directly get description from user data
      specialite: response.user.specialite, // Directly get specialite from user data
      address:response.user.address,
      profilePicture: response.user.profilePicture, // Keep profile picture as well

      isApproved : response.user.isApproved,
    },
  };
}



