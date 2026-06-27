import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../components/DataTable';
import { dateTime } from '../lib/utils';
import { stockApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

export const StockHistory = () => {
  const { data } = useQuery({ queryKey: ['history'], queryFn: () => stockApi.history({ limit: 100 }) });
  const rows = data?.data?.items || [];
  return <div className="space-y-6"><PageTitle title="Stock History" subtitle="Complete movement audit log across products and orders." /><DataTable filename="stock-history.csv" rows={rows} columns={[{ key: 'product', label: 'Product', render: (r) => r.product.name }, { key: 'movementType', label: 'Type' }, { key: 'oldQuantity', label: 'Old' }, { key: 'newQuantity', label: 'New' }, { key: 'difference', label: 'Diff' }, { key: 'user', label: 'User', render: (r) => r.user.name }, { key: 'createdAt', label: 'Time', render: (r) => dateTime(r.createdAt) }]} /></div>;
};
