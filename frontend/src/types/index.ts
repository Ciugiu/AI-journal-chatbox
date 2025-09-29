export interface User {
  id: number;
  email: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface JournalEntry {
  id: number;
  entry_text: string;
  ai_response: string;
  created_at: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface JournalResponse {
  entry: JournalEntry;
  message?: string;
}

export interface JournalListResponse {
  entries: JournalEntry[];
}