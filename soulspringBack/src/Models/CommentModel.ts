import mongoose, { Schema, Document, Model } from "mongoose";
import Joi, { ObjectSchema } from "joi";

// Define the interface for the Comment document
export interface IComment extends Document {
  content: string;
 isBlocked : boolean;

  likes: mongoose.Types.ObjectId[];
  autheurModel : string,

  autheur: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId instead of string
  post: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema for Comment
const CommentSchema: Schema = new Schema(
  {
    content: { type: String, required: true, trim: true, minlength: 3 },
  
  isBlocked : {type: Boolean , default : false},
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],

     // autheur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 

      autheur: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'autheurModel'
      },
      autheurModel: {
        type: String,
        enum: ['User', 'Professional']
      },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);
// Joi validation schema for creating a comment
export const validateComment = (data: object): Joi.ValidationResult => {
  const schema: ObjectSchema = Joi.object({
    content: Joi.string().trim().min(3).required(),
    post: Joi.string().required(),
    autheur: Joi.string().length(24).hex().required(), // Validating that autheur is a valid ObjectId
  });
  return schema.validate(data);
};
// Define the Mongoose model for Comment
export const Comment: Model<IComment> = mongoose.model<IComment>("Comment", CommentSchema);

