import { Card } from '../components/ui/Card';
import { PageTitle } from './Dashboard';

export const Settings = () => <div className="space-y-6"><PageTitle title="Settings" subtitle="Workspace preferences and operational defaults." /><Card className="p-5"><div className="grid gap-4 md:grid-cols-2"><label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Low stock alerts</label><label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Confirmation dialogs</label><label className="flex items-center gap-3"><input type="checkbox" /> Compact tables</label><label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Success animations</label></div></Card></div>;
