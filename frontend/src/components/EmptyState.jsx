import { PackageOpen } from 'lucide-react';

export const EmptyState = ({ title = 'Nothing here yet', description = 'Create a record to get started.' }) => (
  <div className="grid place-items-center rounded-md border border-dashed border-border p-10 text-center">
    <PackageOpen className="mb-3 text-primary" />
    <h3 className="font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-foreground/60">{description}</p>
  </div>
);
