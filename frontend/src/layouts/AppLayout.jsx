import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Boxes, ClipboardList, History, LogOut, Menu, Moon, Package, Settings, Sun, User, X } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '../services/endpoints';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

const links = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/stocks', label: 'Stock', icon: Boxes },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/history', label: 'History', icon: History },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(document.documentElement.classList.contains('dark'));
  const navigate = useNavigate();
  const { user } = useAuth();
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDark(document.documentElement.classList.contains('dark'));
  };
  const logout = async () => {
    await authApi.logout();
    navigate('/login');
  };
  const nav = (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-card p-4">
      <Link to="/" className="mb-6 flex items-center gap-3 text-lg font-black"><span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">I</span>Inventory</Link>
      <nav className="grid gap-1">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary text-white' : 'hover:bg-muted'}`}><Icon size={18} />{label}</NavLink>)}</nav>
      <div className="mt-auto rounded-md bg-muted p-3 text-sm"><b>{user?.name}</b><p className="text-foreground/60">{user?.role}</p></div>
    </aside>
  );
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <div className="hidden lg:block">{nav}</div>
      {open && <div className="fixed inset-0 z-40 flex bg-black/40 lg:hidden"><div>{nav}</div><button className="m-4 h-10 w-10 rounded-md bg-card" onClick={() => setOpen(false)}><X className="mx-auto" /></button></div>}
      <main className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur">
          <Button variant="ghost" className="lg:hidden" onClick={() => setOpen(true)}><Menu size={20} /></Button>
          <div className="hidden text-sm text-foreground/60 sm:block">Operations command center</div>
          <div className="ml-auto flex gap-2">
            <Button variant="secondary" onClick={toggleTheme}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
            <Button variant="secondary" onClick={logout}><LogOut size={16} />Logout</Button>
          </div>
        </header>
        <div className="p-4 sm:p-6"><Outlet /></div>
      </main>
    </div>
  );
};
