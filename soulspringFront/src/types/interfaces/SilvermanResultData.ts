export interface LearningStyleData {
  score: number;
  category: string;
  percentage: string;
}

export interface Result {
  created_at: string;
  id: number;
  scores: {
    [key: string]: LearningStyleData;
  };
  updated_at: string;
  user_id: number;
}

export interface ApiResponse {
  result: Result;
}
