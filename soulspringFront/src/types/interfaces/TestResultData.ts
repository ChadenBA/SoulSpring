export interface StressPrediction {
  Percentage: number; // The percentage of stress prediction
  stressprediction: string; // The stress prediction level (e.g., "Medium")
}

export interface DisorderPrediction {
  disorderPrediction: string; // The type of disorder prediction (e.g., "ADHD")
  severity: string; // The severity level (e.g., "Severe")
}

export interface Result {
  _id: string; // The unique ID for the result
  userId: string; // The user ID
  stressPrediction: StressPrediction; // Stress prediction data
  disorderPrediction: DisorderPrediction; // Disorder prediction data
  __v: number; // Version key (if needed for your system)
  timestamp: string; // Timestamp of the result
}

export interface ApiResponse {
  message: string; // A success message
  data: Result; // The result data
}
