import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authApi } from '../services/endpoints';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const Login = () => {
  const navigate = useNavigate();
  const { refetch } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { email: 'admin@inventory.local', password: 'Admin1234' } });
  const submit = async (data) => {
    try { await authApi.login(data); await refetch(); toast('Welcome back'); navigate('/'); } catch (e) { toast(e.message, 'error'); }
  };
  return <AuthShell title="Welcome back" subtitle="Sign in to manage inventory, orders, and stock movement."><form onSubmit={handleSubmit(submit)} className="space-y-4"><Input label="Email" {...register('email')} error={errors.email} /><Input label="Password" type="password" {...register('password')} error={errors.password} /><Button className="w-full" loading={isSubmitting}><LogIn size={16} />Login</Button><p className="text-center text-sm text-foreground/60">New team? <Link className="font-semibold text-primary" to="/register">Create account</Link></p></form></AuthShell>;
};

export const AuthShell = ({ title, subtitle, children }) => (
  <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/.18),transparent_34%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)))] p-4">
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Card className="p-6"><div className="mb-6"><div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-primary font-black text-white">I</div><h1 className="text-2xl font-black">{title}</h1><p className="mt-1 text-sm text-foreground/60">{subtitle}</p></div>{children}</Card>
    </motion.div>
  </div>
);
