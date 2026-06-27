import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authApi } from '../services/endpoints';
import { AuthShell } from './Login';

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8), role: z.enum(['ADMIN', 'EMPLOYEE']) });

export const Register = () => {
  const navigate = useNavigate();
  const { refetch } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { role: 'EMPLOYEE' } });
  const submit = async (data) => { try { await authApi.register(data); await refetch(); toast('Account created'); navigate('/'); } catch (e) { toast(e.message, 'error'); } };
  return <AuthShell title="Create account" subtitle="Invite an operator or start a new workspace."><form onSubmit={handleSubmit(submit)} className="space-y-4"><Input label="Name" {...register('name')} error={errors.name} /><Input label="Email" {...register('email')} error={errors.email} /><Input label="Password" type="password" {...register('password')} error={errors.password} /><Select label="Role" {...register('role')}><option>EMPLOYEE</option><option>ADMIN</option></Select><Button className="w-full" loading={isSubmitting}><UserPlus size={16} />Register</Button><p className="text-center text-sm text-foreground/60">Already registered? <Link className="font-semibold text-primary" to="/login">Login</Link></p></form></AuthShell>;
};
