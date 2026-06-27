import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useToast } from '../context/ToastContext';
import { orderApi, productApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

const schema = z.object({ customer: z.string().min(2), items: z.array(z.object({ productId: z.coerce.number().int().min(1), quantity: z.coerce.number().int().min(1) })).min(1) });

export const OrderForm = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery({ queryKey: ['products'], queryFn: () => productApi.list({ limit: 100 }) });
  const products = data?.data?.items || [];
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { customer: '', items: [{ productId: '', quantity: 1 }] } });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'items' });
  const create = useMutation({ mutationFn: orderApi.create, onSuccess: () => { toast('Order created and stock deducted'); qc.invalidateQueries(); navigate('/orders'); }, onError: (e) => toast(e.message, 'error') });
  return <div className="space-y-6"><PageTitle title="Create Order" subtitle="Stock is reserved immediately when the order is saved." /><Card className="p-5"><form onSubmit={form.handleSubmit((v) => create.mutate(v))} className="space-y-4"><Input label="Customer" {...form.register('customer')} error={form.formState.errors.customer} />{fields.map((field, index) => <div key={field.id} className="grid gap-3 rounded-md border border-border p-3 md:grid-cols-[1fr_10rem_auto]"><Select label="Product" {...form.register(`items.${index}.productId`)}><option value="">Select product</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.currentStock} in stock</option>)}</Select><Input label="Quantity" type="number" {...form.register(`items.${index}.quantity`)} /><Button type="button" variant="secondary" onClick={() => remove(index)}><Trash2 size={16} /></Button></div>)}<div className="flex gap-2"><Button type="button" variant="secondary" onClick={() => append({ productId: '', quantity: 1 })}><Plus size={16} />Add Item</Button><Button loading={create.isPending}><Save size={16} />Create Order</Button></div></form></Card></div>;
};
