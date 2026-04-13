export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}
