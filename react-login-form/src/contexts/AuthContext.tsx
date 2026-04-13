import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseStoredUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem('users') ?? '[]');
  } catch (err) {
    console.error('Stored users could not be parsed', err);
    return [];
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Stored session could not be restored', err);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const users = parseStoredUsers();
      const foundUser = users.find((storedUser) => storedUser.email === email && storedUser.password === password);

      if (!foundUser) {
        setError('Email or password is incorrect');
        return false;
      }

      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    } catch (err) {
      console.error('Login error', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Omit<User, 'id'>): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const users = parseStoredUsers();

        const alreadyTaken = users.some(
          (storedUser) =>
            storedUser.email.toLowerCase() === userData.email.toLowerCase() ||
            storedUser.username.toLowerCase() === userData.username.toLowerCase(),
        );

        if (alreadyTaken) {
          setError('Email or username is already taken');
          return false;
        }

        const newUser: User = {
          ...userData,
          id: (globalThis.crypto?.randomUUID?.() ?? Date.now().toString()),
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        return true;
      } catch (err) {
        console.error('Registration error', err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      clearError,
    }),
    [user, loading, error, login, register, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
