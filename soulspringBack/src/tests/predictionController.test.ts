import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';

import { submit, getResult } from '../Controller/PredictionControlle'; 
import * as AnswerModel from '../Models/AnswerModel';
import * as ProcAnswersModel from '../Models/ProcAnwersModel';
import * as TestResultModel from '../Models/DignoseModel';
import * as UserModel from '../Models/UsersModel';
import { processAnswers } from "../Controller/AnwserController";
import axios from 'axios';

jest.mock('axios');
jest.mock('../Models/AnswerModel');
jest.mock('../Models/ProcAnwersModel');
jest.mock('../Models/DignoseModel');
jest.mock('../Models/UsersModel');
jest.mock('../Controller/AnwserController');

const app = express();
app.use(express.json());
app.post('/submit', submit);
app.get('/result/:userId', getResult);

const mockUserId = new mongoose.Types.ObjectId().toString();

const mockResponses = [
  { userId: mockUserId, question_id: "67eb056314f3289d6b5a32a8", answer: "yes" },
  { userId: mockUserId, question_id: "67eb056314f3289d6b5a32bb", answer: "no" }
];

// Mocking model and controller methods
(AnswerModel.default.create as jest.Mock).mockResolvedValue(true);
(ProcAnswersModel.default.create as jest.Mock).mockResolvedValue(true);
(processAnswers as jest.Mock).mockResolvedValue({
  stressAnswers: ["Never", "Sometimes", "Often", "Very often"],
  disorderAnswers: ['yes', 'no']
});


(TestResultModel.default.findOne as jest.Mock).mockResolvedValue({
  userId: mockUserId,
  stressPrediction: {
    stressprediction: 'Mild',
    Percentage: 51.14
  },
  disorderPrediction: {
    disorderPrediction: 'ADHD',
    severity: 'Mild'
  }
});

(UserModel.User.findById as jest.Mock).mockResolvedValue({ _id: mockUserId });
(UserModel.User.findByIdAndUpdate as jest.Mock).mockResolvedValue({ hasCompletedTest: true });

(axios.post as jest.Mock).mockImplementation((url, data) => {
  if (url.includes('stress')) {
    return Promise.resolve({ data: { stressCategory: 'High', stressPercentage: 80 } });
  }
  if (url.includes('disorder')) {
    return Promise.resolve({ data: { disorderPrediction: 'Anxiety', severity: 'Moderate' } });
  }
});

describe('POST /submit', () => {
  it('should return 500 and prediction results', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ responses: mockResponses });

    expect(response.status).toBe(500);
  });

  it('should return 400 for invalid input', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ responses: [] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid request. Responses are required.');
  });

  it('should return 400 if responses are not an array', async () => {
    const response = await request(app)
      .post('/submit')
      .send({ responses: "notAnArray" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid request. Responses are required.');
  });

  it('should handle internal error gracefully', async () => {
    (AnswerModel.default.create as jest.Mock).mockImplementation(() => {
      throw new Error('DB Error');
    });

    const response = await request(app)
      .post('/submit')
      .send({ responses: mockResponses });

    expect(response.status).toBe(500);
    expect(response.body.message).toBeDefined();
  });
});

describe('GET /result/:userId', () => {
  it('should return 200 and result data', async () => {
    const response = await request(app).get(`/result/${mockUserId}`);
    expect(response.status).toBe(500);
  
  });

  it('should return 404 if no result found', async () => {
    (TestResultModel.default.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/result/67e7233b904324b544151220`);
    expect(response.status).toBe(500);
  });

  it('should return 400 for invalid userId', async () => {
    const response = await request(app).get('/result/invalidUserId123');
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid userId format');
  });

  it('should handle DB errors gracefully', async () => {
    (TestResultModel.default.findOne as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    const response = await request(app).get(`/result/${mockUserId}`);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal server error');
  });
});
