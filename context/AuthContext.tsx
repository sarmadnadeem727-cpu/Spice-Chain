
import React, { createContext, useContext, useState } from 'react';
import { User, UserRole, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, type: UserType) => void;
  logout: () => void;
  completeOnboardingStep: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('spicechain_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, type: UserType) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email || 'demo@spicechain.io',
      role: 'SME',
      type,
      region: 'South Asia',
      isAuthenticated: true,
      onboardingStep: 3,
      isBoarded: true, // Defaulting to true to "let users in" immediately
    };
    setUser(newUser);
    localStorage.setItem('spicechain_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spicechain_user');
  };

  const completeOnboardingStep = () => {
    if (user) {
      const updated = { ...user, isBoarded: true };
      setUser(updated);
      localStorage.setItem('spicechain_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeOnboardingStep }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
