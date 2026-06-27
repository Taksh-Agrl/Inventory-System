import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { currency } from '../lib/utils';
import { productApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

export const Products = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['products'], queryFn: () => productApi.list({ limit: 100 }) });
  const remove = useMutation({ mutationFn: productApi.remove, onSuccess: () => { toast('Product deleted'); qc.invalidateQueries({ queryKey: ['products'] }); } });
  const rows = data?.data?.items || [];
  return <div className="space-y-6"><PageTitle title="Products" subtitle="Catalog, SKU, pricing, and stock position." action={isAdmin && <Link className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white" to="/products/new"><Plus size={16} />New Product</Link>} /><DataTable filename="products.csv" rows={rows} columns={[{ key: 'name', label: 'Name' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: 'Category' }, { key: 'price', label: 'Price', render: (r) => currency(r.price) }, { key: 'currentStock', label: 'Stock' }, { key: 'actions', label: 'Actions', render: (r) => <div className="flex gap-2">{isAdmin && <><Link className="rounded-md border border-border p-2" to={`/products/${r.id}/edit`}><Edit size={15} /></Link><button className="rounded-md border border-border p-2 text-red-500" onClick={() => confirm('Delete product?') && remove.mutate(r.id)}><Trash2 size={15} /></button></>}</div> }]} /></div>;
};
