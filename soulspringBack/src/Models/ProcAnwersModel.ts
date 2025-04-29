import mongoose from 'mongoose';

const processedAnswersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stressAnswers: { type: [Number], required: true },  // Array of numerical features for stress
  disorderAnswers: { type: [Number], required: true },  // Array of numerical features for disorder
}, { timestamps: true });

const ProcessedAnswers = mongoose.model("processedAnswers", processedAnswersSchema);

export default ProcessedAnswers;
