import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { OrderDetails } from './pages/OrderDetails';
import { OrderForm } from './pages/OrderForm';
import { Orders } from './pages/Orders';
import { ProductForm } from './pages/ProductForm';
import { Products } from './pages/Products';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { StockHistory } from './pages/StockHistory';
import { StockManagement } from './pages/StockManagement';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const queryClient = new QueryClient();

const AppRoutes = () => {
  useKeyboardShortcuts();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="stocks" element={<StockManagement />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/new" element={<OrderForm />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="history" element={<StockHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
