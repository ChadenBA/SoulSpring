import mongoose, { Document, Schema } from 'mongoose';

export interface ITestResult extends Document {
    userId:  Schema.Types.ObjectId ;
    stressPrediction: {
        stressprediction: string;
        Percentage: number;
    };
    disorderPrediction: {
        disorderPrediction: string;
        severity: string;
    };
    timestamp: Date;
}

const testResultSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    stressPrediction: {
        stressprediction: { type: String, required: true },
        Percentage: { type: Number, required: true }
    },
    disorderPrediction: {
        disorderPrediction: { type: String, required: true },
        severity: { type: String, required: true }
    },
    timestamp: { type: Date, default: Date.now }
});

// Create the model
const TestResult = mongoose.model<ITestResult>('TestResult', testResultSchema);

export default TestResult;
