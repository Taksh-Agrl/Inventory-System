import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../services/endpoints';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: false, staleTime: 5 * 60 * 1000 });
  const user = me.data?.data?.user || null;
  return <AuthContext.Provider value={{ user, isAdmin: user?.role === 'ADMIN', loading: me.isLoading, refetch: me.refetch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
