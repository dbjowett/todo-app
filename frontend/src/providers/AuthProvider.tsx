import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { logout } from '../api/auth';
// import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  signIn: (tokens: { access_token: string; refresh_token: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: async () => {},
  isLoggedIn: false,
  isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useSession must be used within a SessionProvider');
  return ctx;
};

const storeTokens = async (tokens: { access_token: string; refresh_token?: string }) => {
  localStorage.setItem('accessToken', tokens.access_token);
  if (tokens.refresh_token) localStorage.setItem('refreshToken', tokens.refresh_token);
};

const deleteTokensFromStore = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const getAccessToken = () => localStorage.getItem('accessToken');

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = getAccessToken();
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => {
    if (!access_token) {
      throw new Error('No access token received from login');
    }
    await storeTokens({ access_token, refresh_token });
    setIsLoggedIn(true);
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      await deleteTokensFromStore();
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
