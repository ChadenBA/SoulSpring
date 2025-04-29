import { UserRoleEnum } from '@config/enums/role.enum';
import { User } from 'types/models/User';

export interface UserApi {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: UserRoleEnum;
  age: number;
  profilePicture?: {
    url: string;
    publicId: string;
};

 password_confirmation:string;
  password?: string;
  createdAt?: string;
  hasCompletedTest : boolean,
  contact?: number;
  description?: string,
  specialite ?: string,
  address ? : string
  isApproved?: boolean,

}

export interface SingleUserResponseData {
  message: string;
 // data: UserApi;
  user:UserApi;
}

export interface UpdateResponseApi {
  message: string;
  data: UserApi;
  user: UserApi; // l'api retourne userApi et pas user
}


export interface UpdateResponse {
  message: string;
  user: User; // l'api retourne user et pas userApi
  //data:User;
}
