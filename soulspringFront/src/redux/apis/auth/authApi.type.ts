import { UserRoleEnum } from '@config/enums/role.enum';
import { Professional } from 'types/models/Prof';
import { User } from 'types/models/User';

export interface RegisterBodyApi {
  id: string,
  token: string,
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  role: UserRoleEnum;
  password_confirmation:string;
   profilePicture? : {
     url: string;
    publicId: string;
 },

   specialite: string,
    description: string, 
    contact : number,
    isApproved: boolean,
    isSuspended  : boolean,
    address:string

    
}



export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseApi {
  message: string;
  token: string;          // Add token field
  refreshToken: string;   // Add refreshToken field
  user: {
    
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: UserRoleEnum;
    age: number;
    profilePicture : {
      url: string;
      publicId: string;
  }; 
  
  hasCompletedTest:boolean,
   
    password_confirmation:string;
    password: string;
    contact: number;
    description: string,
    specialite : string,
    address:string
    isApproved: boolean,

    
  };
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    refreshToken: string;   
    user: User;
    contact: number;
    description: string,
    specialite : string,
    address:string,
    profilePicture?: {
      url: string;
      publicId: string;
  }; 
  isApproved ?: boolean,
  isSuspended ? : boolean
 };
}
