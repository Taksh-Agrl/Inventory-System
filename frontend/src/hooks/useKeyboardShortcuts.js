import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      const map = { d: '/', p: '/products', o: '/orders', s: '/stocks' };
      if (map[event.key]) {
        event.preventDefault();
        navigate(map[event.key]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
};
