import mongoose, { Schema, Document, model } from "mongoose";

// Define the Answer interface with the correct types
interface IAnswer extends Document {
    answers: { 
        userId: Schema.Types.ObjectId; // User reference
        questionId: Schema.Types.ObjectId; // Reference to Question
        option: string; // Answer selected by the user
    }[];
}

const answerSchema = new Schema<IAnswer>({
    answers: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 

            questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
            option: { type: String, required: true } // The selected answer option
        }
    ]
}, { timestamps: true });

const Answer = model<IAnswer>('Answer', answerSchema);

export default Answer;
