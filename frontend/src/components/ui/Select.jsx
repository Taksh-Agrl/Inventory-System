import { cn } from '../../lib/utils';

export const Select = ({ label, error, className, children, ...props }) => (
  <label className="grid gap-1.5 text-sm">
    {label && <span className="font-medium">{label}</span>}
    <select className={cn('focus-ring h-10 rounded-md border border-border bg-card px-3 outline-none', className)} {...props}>{children}</select>
    {error && <span className="text-xs text-red-500">{error.message || error}</span>}
  </label>
);
