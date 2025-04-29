export interface AppointmentApi {
    id:number;
    professionalid:number ; // L'id du professionnel
    userid: number ;         // L'id de l'utilisateur qui prend rdv
    date: Date ;                            // Date et heure du rdv
    status: string; // État du rdv
    reason: string;  
}

 export interface SingleAppointementResponseData {
    message: string;
    data: AppointmentApi;
  }
  