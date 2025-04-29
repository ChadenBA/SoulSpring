import { Schema, model, Document, Types } from 'mongoose';

interface IQuestion extends Document {
    qtext: { en: string; fr: string }; // English and French question texts
    category: string; 
}

const questionSchema = new Schema<IQuestion>({
    qtext: {
        en: { type: String, required: true },
        fr: { type: String, required: true },
    },
    category: { type: String, required: true },
});

const Question = model<IQuestion>('Question', questionSchema);

export default Question;
