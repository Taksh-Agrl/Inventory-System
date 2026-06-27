import { createContext, useContext, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toast = (message, type = 'success') => {
    const id = crypto.randomUUID();
    setToasts((items) => [...items, { id, message, type }]);
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3500);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((item) => (
          <div key={item.id} className="flex min-w-72 items-center gap-3 rounded-md border border-border bg-card p-3 shadow-xl">
            <CheckCircle className={item.type === 'error' ? 'text-red-500' : 'text-primary'} size={18} />
            <span className="text-sm">{item.message}</span>
            <X className="ml-auto cursor-pointer" size={16} onClick={() => setToasts((items) => items.filter((i) => i.id !== item.id))} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
