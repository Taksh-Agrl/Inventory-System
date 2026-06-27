import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { currency, dateTime } from '../lib/utils';
import { orderApi } from '../services/endpoints';
import { PageTitle } from './Dashboard';

export const OrderDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({ queryKey: ['order', id], queryFn: () => orderApi.get(id) });
  const order = data?.data;
  if (!order) return null;
  return <div className="space-y-6"><PageTitle title={order.orderNo} subtitle={`${order.customer} · ${order.status} · ${dateTime(order.createdAt)}`} /><Card className="p-5"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border text-left"><th className="py-2">Product</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead><tbody>{order.items.map((item) => <tr key={item.id} className="border-b border-border"><td className="py-3">{item.product.name}</td><td>{item.quantity}</td><td>{currency(item.unitPrice)}</td><td>{currency(item.lineTotal)}</td></tr>)}</tbody></table></div><div className="mt-4 text-right text-2xl font-black">{currency(order.total)}</div></Card></div>;
};
