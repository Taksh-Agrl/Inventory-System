import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Button = ({ className, variant = 'primary', loading, children, ...props }) => (
  <button
    className={cn(
      'focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
      variant === 'primary' && 'bg-primary text-white shadow-sm hover:brightness-110',
      variant === 'secondary' && 'border border-border bg-card hover:bg-muted',
      variant === 'ghost' && 'hover:bg-muted',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
      className
    )}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && <Loader2 className="animate-spin" size={16} />}
    {children}
  </button>
);
