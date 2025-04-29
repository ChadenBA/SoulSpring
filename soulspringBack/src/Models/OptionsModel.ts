import { Schema, model, Document } from 'mongoose';

interface IOption extends Document {
    _id: string;
    optionstext: { en: string; fr: string }; // English and French texts
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' }; // Reference to the question
}

const optionSchema = new Schema<IOption>({
    optionstext: {
        en: { type: String, required: true }, // English text
        fr: { type: String, required: true }, // French text
    },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true }, // Reference to Question model
});

const Option = model<IOption>('Option', optionSchema);

export default Option;
