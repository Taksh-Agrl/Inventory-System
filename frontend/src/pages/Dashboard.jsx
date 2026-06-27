import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/Skeleton';
import { currency, dateTime } from '../lib/utils';
import { dashboardApi } from '../services/endpoints';

const colors = ['#0891b2', '#f59e0b', '#10b981', '#ef4444'];

export const Dashboard = () => {
  const { data, isLoading } = useQuery({ queryKey: ['dashboard'], queryFn: dashboardApi.summary });
  if (isLoading) return <Skeleton className="h-[520px]" />;
  const d = data.data;
  const cards = [
    ['Total Products', d.totals.totalProducts, Package],
    ['Low Stock', d.totals.lowStock, AlertTriangle],
    ['Total Orders', d.totals.totalOrders, ShoppingCart],
    ['Revenue', currency(d.totals.revenue), DollarSign]
  ];
  return <div className="space-y-6"><PageTitle title="Dashboard" subtitle="Live view of inventory health and order movement." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon]) => <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><Card className="p-5"><div className="flex items-center justify-between"><p className="text-sm text-foreground/60">{label}</p><Icon className="text-primary" size={20} /></div><div className="mt-3 text-3xl font-black">{value}</div></Card></motion.div>)}</div><div className="grid gap-4 xl:grid-cols-3"><ChartCard title="Revenue Trend"><ResponsiveContainer width="100%" height={260}><LineChart data={d.charts.monthlyRevenue}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line dataKey="revenue" stroke="#0891b2" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartCard><ChartCard title="Categories"><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={d.charts.categoryMix} dataKey="value" nameKey="name" outerRadius={90}>{d.charts.categoryMix.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartCard><ChartCard title="Orders"><ResponsiveContainer width="100%" height={260}><BarChart data={d.charts.orderStatus}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#f59e0b" /></BarChart></ResponsiveContainer></ChartCard></div><div className="grid gap-4 xl:grid-cols-2"><Card className="p-5"><h2 className="font-bold">Recent Orders</h2><div className="mt-3 space-y-3">{d.recentOrders.map((o) => <div key={o.id} className="flex justify-between border-b border-border pb-2 text-sm"><span>{o.orderNo} · {o.customer}</span><b>{currency(o.total)}</b></div>)}</div></Card><Card className="p-5"><h2 className="font-bold">Recent Stock Activities</h2><div className="mt-3 space-y-3">{d.recentStockActivities.map((h) => <div key={h.id} className="flex justify-between border-b border-border pb-2 text-sm"><span>{h.product.name} · {h.movementType}</span><span>{dateTime(h.createdAt)}</span></div>)}</div></Card></div></div>;
};

export const PageTitle = ({ title, subtitle, action }) => <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-black sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-foreground/60">{subtitle}</p></div>{action}</div>;
const ChartCard = ({ title, children }) => <Card className="p-5"><h2 className="mb-4 font-bold">{title}</h2>{children}</Card>;
