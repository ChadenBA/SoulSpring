import mongoose, { Schema, Document, Model } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

// Interface for the common user fields
export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" ;
  profilePicture: {
    url: string;
    publicId: string | null;
  };
  age: number;
  hasCompletedTest: { type: Boolean, default: false, required: true },

  generateLoginToken(): string;

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

// Common Base Schema for all user types
const BaseUserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, required: true },
    resetPasswordToken: { type: String }, // Stocke le token temporairement
    resetPasswordExpires: { type: Date }, // Stocke la date d'expiration du token
   profilePicture: {
       type: Object,
       default: {
         url: "https://cdn.pixabay.com/photo/2018/04/26/16/31/marine-3352341_960_720.jpg",
         publicId: null,
       },
     },
    age: { type: Number, required: true}, 
    hasCompletedTest : { type: Boolean , default: false, required : true } ,

  },
  { timestamps: true, collection: "users" ,strict: true } 

);


BaseUserSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password; // Hide sensitive data
    return ret;
  },
});
BaseUserSchema.set('toJSON', {
  virtuals: true,
});

// Create the base model

export const User = mongoose.model<IUser>("User", BaseUserSchema);


