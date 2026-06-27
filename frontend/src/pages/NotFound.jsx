import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFound = () => <div className="grid min-h-[70vh] place-items-center text-center"><div><h1 className="text-6xl font-black">404</h1><p className="mt-2 text-foreground/60">The page you requested does not exist.</p><Link to="/"><Button className="mt-5">Back to Dashboard</Button></Link></div></div>;
