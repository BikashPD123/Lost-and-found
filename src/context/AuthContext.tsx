import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'Admin' | 'User';

interface UserProfile {
  name: string;
  email: string;
  studentId?: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: UserProfile | null;
  error: string | null;
  masterAdminEmail: string | null;
  login: (email: string, role: UserRole, password?: string, name?: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MASTER_ADMIN_EMAIL = 'kagestar@gmail.com';
const MASTER_ADMIN_PASSWORD = 'bikash112kumar';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as UserProfile;
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [masterAdminEmail] = useState<string | null>(MASTER_ADMIN_EMAIL);

  const login = (email: string, role: UserRole, password?: string, name?: string) => {
    // Strict Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g., name@domain.com).');
      return false;
    }

    // Check if an admin is already logged in elsewhere (simulated via localStorage)
    const activeAdmin = localStorage.getItem('activeAdmin');

    const resolvedRole = (email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) ? 'Admin' : role;

    if (resolvedRole === 'Admin') {
      // Enforce specific Admin Key Credentials
      if (email.toLowerCase() !== MASTER_ADMIN_EMAIL.toLowerCase() || password !== MASTER_ADMIN_PASSWORD) {
        setError('Invalid Email or Password');
        return false;
      }

      if (activeAdmin && activeAdmin.toLowerCase() !== email.toLowerCase()) {
        setError('An admin profile is already active on another session.');
        return false;
      }
    }

    // Mock login logic
    const mockUser: UserProfile = {
      name: name ? name : (resolvedRole === 'Admin' ? 'Administrator' : email.split('@')[0]),
      email: email,
      role: resolvedRole,
      studentId: resolvedRole === 'User' ? 'STU' + Math.floor(100000 + Math.random() * 900000) : undefined,
    };

    if (resolvedRole === 'Admin') {
      localStorage.setItem('activeAdmin', email);
    }

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setError(null);
    return true;
  };

  const logout = () => {
    if (user?.role === 'Admin') {
      localStorage.removeItem('activeAdmin');
    }
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = prev ? { ...prev, ...profile } : null;
      if (updated) {
        localStorage.setItem('user', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      error,
      masterAdminEmail,
      login,
      logout,
      updateProfile,
      clearError,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
