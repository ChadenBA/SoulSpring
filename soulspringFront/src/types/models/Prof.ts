import { UserRoleEnum } from "@config/enums/role.enum";
import { User } from "./User";

export interface Professional{
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string; 
    address :string;
    age: number;
    profilePicture?: {
        url: string;
        publicId: string;
    };    
    password?: string;
    contact: number;
    description: string,
    specialite : string,
    isApproved ?: boolean,
    isSuspended ? : boolean
}
