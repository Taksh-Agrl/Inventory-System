import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Skeleton } from '../components/Skeleton';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6"><Skeleton className="h-96" /></div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
