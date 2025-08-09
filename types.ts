
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  declarativeContent: string;
  proceduralContent: string;
  exampleHtml: string;
  quiz: Quiz;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}
