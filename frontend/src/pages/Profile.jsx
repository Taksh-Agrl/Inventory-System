import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { PageTitle } from './Dashboard';

export const Profile = () => {
  const { user } = useAuth();
  return <div className="space-y-6"><PageTitle title="Profile" subtitle="Signed-in operator details." /><Card className="max-w-xl p-5"><dl className="grid gap-3 text-sm"><div><dt className="text-foreground/60">Name</dt><dd className="font-semibold">{user?.name}</dd></div><div><dt className="text-foreground/60">Email</dt><dd className="font-semibold">{user?.email}</dd></div><div><dt className="text-foreground/60">Role</dt><dd className="font-semibold">{user?.role}</dd></div></dl></Card></div>;
};
