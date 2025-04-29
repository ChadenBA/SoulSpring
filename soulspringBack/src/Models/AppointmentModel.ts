import mongoose, { Schema, Document } from 'mongoose';


export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export interface IAppointment extends Document {
  professional: mongoose.Types.ObjectId; // L'id du professionnel
  user: mongoose.Types.ObjectId;         // L'id de l'utilisateur qui prend rdv
  date: Date;                            // Date et heure du rdv
  status:AppointmentStatus; // État du rdv
  reason: string;                       // Raison du rdv 
}

const AppointmentSchema: Schema = new Schema<IAppointment>({
  professional: { type: Schema.Types.ObjectId, ref: 'Professional', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELLED],
    default: AppointmentStatus.PENDING,  // Par défaut, un rendez-vous est en attente
  },
  reason: { type: String },
 
},
{ timestamps: true });

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
