import mongoose, { Schema, Document } from "mongoose";

export interface IProfessional extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  age: number;
  profilePicture: {
    //type: Object,
   // default: {
      url:string ,
      publicId: string | null,
   // },

  },  
  specialite: string;
  description: string;
  contact: number;
  isApproved: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isSuspended: { type: Boolean, default: false },
  address:string;
}

const ProfessionalSchema = new Schema<IProfessional>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "professional" },
    age: { type: Number, required: true },
    profilePicture: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_960_720.jpg",
        publicId: null,
      },
    },
        specialite: { type: String, required: true, trim: true },

        address:{ type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true},
    contact: { type: Number, required: true },
    isApproved: { type: Boolean, default: false }, 
    resetPasswordToken: { type: String }, // Stocke le token temporairement
    resetPasswordExpires: { type: Date }, // Stocke la date d
    isSuspended: { type: Boolean, default: false },
  },
   
  
  { timestamps: true, collection: "professionals" } 
);

export const Professional = mongoose.model<IProfessional>("Professional", ProfessionalSchema);
