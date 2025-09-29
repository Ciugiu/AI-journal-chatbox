import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface JournalEntry {
  id: number;
  user_id: number;
  content: string;
  ai_response: string;
  response_type: string;
  created_at: string;
}

export interface AuthRequest extends Request {
  userId?: number;
}

export interface AuthResponse {
  message?: string;
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface JournalResponse {
  id: number;
  content: string;
  ai_response: string;
  response_type: string;
  created_at: string;
}