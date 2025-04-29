import mongoose, { Schema, Document, Model } from "mongoose";
import Joi, { ObjectSchema } from "joi";
import { User } from "./UsersModel";

import { Professional } from "./professionalModel";


// Define the interface for the Post document
export interface IPost extends Document {
  title: string;
  content: string;
  isBlocked : boolean;

  autheurModel : string,
  likes: mongoose.Types.ObjectId[];

  autheur: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId instead of string
  comments: mongoose.Types.ObjectId[]; // Array of Comment IDs
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema for Post


const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 255 },
    content: { type: String, required: true, minlength: 10 },
    isBlocked : {type: Boolean , default : false},
    likes: [{ type: mongoose.Schema.Types.ObjectId, refPath: "autheurModel", default: [] }],

    autheur: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "autheurModel",  // 👈 dynamic ref
    },
    autheurModel: {
      type: String,
      required: true,
      enum: ["User", "Professional"], // 👈 restrict the models
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  { timestamps: true }
);

// Define the Mongoose model for Post

// Joi validation schema for creating a post
export const validatePost = (data: object): Joi.ValidationResult => {
  const schema: ObjectSchema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    content: Joi.string().trim().min(10).required(),
    autheur: Joi.string().length(24).hex().required(), // Validating that autheur is a valid ObjectId

  });
  return schema.validate(data);
};

// Define the Mongoose model for Post
export const Post: Model<IPost> = mongoose.model<IPost>("Post", PostSchema);

