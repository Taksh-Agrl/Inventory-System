import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Boxes, SlidersHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useToast } from '../context/ToastContext';
import { productApi, stockApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

const moveSchema = z.object({ productId: z.coerce.number().int().min(1), quantity: z.coerce.number().int().min(1), movementType: z.enum(['ADD', 'REMOVE']), note: z.string().optional() });
const adjustSchema = z.object({ productId: z.coerce.number().int().min(1), newQuantity: z.coerce.number().int().min(0), note: z.string().optional() });

export const StockManagement = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['products'], queryFn: () => productApi.list({ limit: 100 }) });
  const products = data?.data?.items || [];
  const move = useForm({ resolver: zodResolver(moveSchema), defaultValues: { movementType: 'ADD' } });
  const adjust = useForm({ resolver: zodResolver(adjustSchema) });
  const done = () => { toast('Stock updated'); qc.invalidateQueries(); };
  const moveMutation = useMutation({ mutationFn: stockApi.movement, onSuccess: done, onError: (e) => toast(e.message, 'error') });
  const adjustMutation = useMutation({ mutationFn: stockApi.adjust, onSuccess: done, onError: (e) => toast(e.message, 'error') });
  const productOptions = products.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>);
  return <div className="space-y-6"><PageTitle title="Stock Management" subtitle="Receive, remove, and reconcile inventory with audit history." /><div className="grid gap-4 lg:grid-cols-2"><Card className="p-5"><h2 className="mb-4 font-bold">Stock In / Out</h2><form onSubmit={move.handleSubmit((v) => moveMutation.mutate(v))} className="space-y-4"><Select label="Product" {...move.register('productId')} error={move.formState.errors.productId}><option value="">Select product</option>{productOptions}</Select><Select label="Movement" {...move.register('movementType')}><option value="ADD">ADD</option><option value="REMOVE">REMOVE</option></Select><Input label="Quantity" type="number" {...move.register('quantity')} error={move.formState.errors.quantity} /><Input label="Note" {...move.register('note')} /><Button loading={moveMutation.isPending}><Boxes size={16} />Apply Movement</Button></form></Card><Card className="p-5"><h2 className="mb-4 font-bold">Adjust Absolute Stock</h2><form onSubmit={adjust.handleSubmit((v) => adjustMutation.mutate(v))} className="space-y-4"><Select label="Product" {...adjust.register('productId')} error={adjust.formState.errors.productId}><option value="">Select product</option>{productOptions}</Select><Input label="New Quantity" type="number" {...adjust.register('newQuantity')} error={adjust.formState.errors.newQuantity} /><Input label="Note" {...adjust.register('note')} /><Button loading={adjustMutation.isPending}><SlidersHorizontal size={16} />Adjust Stock</Button></form></Card></div></div>;
};
