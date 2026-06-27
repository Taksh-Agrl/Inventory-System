import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { productApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

const schema = z.object({ name: z.string().min(2), sku: z.string().min(2), category: z.string().min(2), description: z.string().optional(), price: z.coerce.number().min(0), currentStock: z.coerce.number().int().min(0) });

export const ProductForm = () => {
  const { id } = useParams();
  const edit = Boolean(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery({ queryKey: ['product', id], queryFn: () => productApi.get(id), enabled: edit });
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { currentStock: 0, price: 0 } });
  useEffect(() => { if (data?.data) reset(data.data); }, [data, reset]);
  const mutation = useMutation({ mutationFn: (payload) => edit ? productApi.update(id, payload) : productApi.create(payload), onSuccess: () => { toast(edit ? 'Product updated' : 'Product created'); qc.invalidateQueries({ queryKey: ['products'] }); navigate('/products'); } });
  return <div className="space-y-6"><PageTitle title={edit ? 'Edit Product' : 'Create Product'} subtitle="Maintain SKU discipline and accurate stock defaults." /><Card className="p-5"><form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="grid gap-4 md:grid-cols-2"><Input label="Name" {...register('name')} error={errors.name} /><Input label="SKU" {...register('sku')} error={errors.sku} /><Input label="Category" {...register('category')} error={errors.category} /><Input label="Price" type="number" step="0.01" {...register('price')} error={errors.price} /><Input label="Current Stock" type="number" {...register('currentStock')} error={errors.currentStock} /><Input label="Description" {...register('description')} /><div className="md:col-span-2"><Button loading={isSubmitting || mutation.isPending}><Save size={16} />Save Product</Button></div></form></Card></div>;
};
