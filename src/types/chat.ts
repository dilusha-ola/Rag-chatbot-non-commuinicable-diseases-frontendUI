export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  references?: Reference[];
}

export interface Reference {
  id: string;
  title: string;
  source: string;
  url?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatResponse {
  answer: string;
  references?: Reference[];
}

export interface ChatRequest {
  question: string;
  session_id?: string;
}
