// types/interfaces/TestQuestion.ts

export interface TestQuestion {
    _id: string; // Unique identifier for the question
    qtext: string; // Text of the question, could be in multiple languages
    options: {
      _id: string; // Unique identifier for the option
      optionstext: string; // Text for the option, could be in multiple languages
    }[]; // Array of options for the question
  }
  