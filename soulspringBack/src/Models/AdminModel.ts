import mongoose, { Schema, Document, Model } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId; 
  name: string;
  lastname: string;
  email: string;
  password: string;
  role:  "admin";

   profilePicture: {
     url: string;
     publicId: string | null;
   };


  age: number;
  generateLoginToken(): string;

  resetPasswordToken: { type: String }, // Stocke le token temporairement
  resetPasswordExpires: { type: Date }, // Stocke la date d'expiration du token
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, required: true, default: "admin"},

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
  },
  { timestamps: true, discriminatorKey: "role", versionKey: false }
);

// JWT Token generation
AdminSchema.methods.generateLoginToken = function (): string {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.PRIVATE_KEY as string,
    { expiresIn: "1h" }
  );
};

// Create the base model
export const Admin = mongoose.model<IAdmin>("admin", AdminSchema);

// Joi validation schemas
export const validateUser = (admin: object) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("admin").required(),
    age: Joi.number().min(18).max(100).required(),  // Age validation (min 18, max 100)
  });
  return schema.validate(admin);
};

// Optionally, you can add a getter to exclude the _id field and use `id` instead
AdminSchema.virtual('id').get(function(this: IAdmin) {
  return this._id.toHexString();
});

// Ensure the virtual field is included in the toJSON output
AdminSchema.set('toJSON', {
  virtuals: true,
});

