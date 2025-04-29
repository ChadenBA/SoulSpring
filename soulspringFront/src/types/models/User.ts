import { UserRoleEnum } from '@config/enums/role.enum';
import { Media } from './Media';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
  age: number;

   profilePicture?: {
     url: string;
     publicId: string;
};  

createdAt?: string;
password?: string;
password_confirmation ?: string;
contact?: number;
description?: string,
specialite ?: string,
hasCompletedTest:Boolean,
address:string
isApproved ?: boolean,
isSuspended ? : boolean

}
