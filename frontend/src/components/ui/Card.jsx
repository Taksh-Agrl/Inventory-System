import { cn } from '../../lib/utils';

export const Card = ({ className, ...props }) => <div className={cn('rounded-md border border-border bg-card shadow-sm', className)} {...props} />;
