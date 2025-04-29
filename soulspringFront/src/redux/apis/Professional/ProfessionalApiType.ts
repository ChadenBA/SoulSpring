export interface ProfessionalApi {
    _id: number;
    name: string;
    lastname: string;
    email: string;
    role: string; 
    age: number;
    profilePicture?: {
      url: string;
      publicId: string;
  };    password?: string;
    contact: number;
    description: string,
    specialite : string,
    isApproved ?: boolean,
    isSuspended ?: boolean,
    address :string, //j'ajoute cette ligne
  }
  
  export interface SingleProResponseData {
    message: string;
    data: ProfessionalApi;
  }
  
  export interface UpdateProResponseApi {
    message: string;
    data: ProfessionalApi;
  }
  
  export interface UpdateProResponse {
    message: string;
    data: ProfessionalApi;
  }
 
export interface Professional {
  id: number;
  name: string;
  lastname: string;
  profilePicture?: {
    url: string;
    publicId?: string;
  };
}

export interface ProfessionalResponse {
  message: string;
  data: Professional[];
  meta: any;
}
