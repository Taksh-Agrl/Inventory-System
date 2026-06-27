import { ArrowDownUp, Download, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toCsv } from '../lib/utils';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { EmptyState } from './EmptyState';

export const DataTable = ({ rows = [], columns, filename = 'export.csv', searchable = true }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(null);
  const data = useMemo(() => {
    let next = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));
    if (sort) next = next.sort((a, b) => String(a[sort]).localeCompare(String(b[sort])));
    return next;
  }, [rows, search, sort]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {searchable && <Input aria-label="Search" placeholder="Search records" value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-72" />}
        <Button variant="secondary" onClick={() => toCsv(data, filename)}><Download size={16} />Export CSV</Button>
      </div>
      {!data.length ? <EmptyState /> : (
        <div className="overflow-hidden rounded-md border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/70">
                <tr>{columns.map((col) => <th key={col.key} className="whitespace-nowrap px-4 py-3 font-semibold"><button className="inline-flex items-center gap-1" onClick={() => setSort(col.key)}>{col.label}<ArrowDownUp size={13} /></button></th>)}</tr>
              </thead>
              <tbody>
                {data.map((row, index) => <tr key={row.id || index} className="border-t border-border">{columns.map((col) => <td key={col.key} className="px-4 py-3">{col.render ? col.render(row) : row[col.key]}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
