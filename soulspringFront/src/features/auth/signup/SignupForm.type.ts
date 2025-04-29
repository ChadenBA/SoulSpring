
export type RegisterBody = {
  id:number,
  token : string; 
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  password: string;
  role: string;
  password_confirmation:string;

   profilePicture ?: {
     url: string;
     publicId: string;
 }; 

   specialite?: string,
    description?: string, 
    contact ?: number,
    isApproved?: boolean,
    isSuspended?  : boolean,
    address? : string
};

