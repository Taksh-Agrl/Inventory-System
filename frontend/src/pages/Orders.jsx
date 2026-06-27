import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Plus, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { useToast } from '../context/ToastContext';
import { currency, dateTime } from '../lib/utils';
import { orderApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

export const Orders = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['orders'], queryFn: () => orderApi.list({ limit: 100 }) });
  const cancel = useMutation({ mutationFn: orderApi.cancel, onSuccess: () => { toast('Order cancelled and stock restored'); qc.invalidateQueries(); }, onError: (e) => toast(e.message, 'error') });
  const rows = data?.data?.items || [];
  return <div className="space-y-6"><PageTitle title="Orders" subtitle="Create, inspect, and cancel customer orders." action={<Link className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white" to="/orders/new"><Plus size={16} />New Order</Link>} /><DataTable filename="orders.csv" rows={rows} columns={[{ key: 'orderNo', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'status', label: 'Status' }, { key: 'total', label: 'Total', render: (r) => currency(r.total) }, { key: 'createdAt', label: 'Created', render: (r) => dateTime(r.createdAt) }, { key: 'actions', label: 'Actions', render: (r) => <div className="flex gap-2"><Link className="rounded-md border border-border p-2" to={`/orders/${r.id}`}><Eye size={15} /></Link>{r.status !== 'CANCELLED' && <button className="rounded-md border border-border p-2 text-red-500" onClick={() => confirm('Cancel order?') && cancel.mutate(r.id)}><XCircle size={15} /></button>}</div> }]} /></div>;
};
