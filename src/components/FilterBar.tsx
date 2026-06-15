import { Search } from 'lucide-react';
import clsx from 'clsx';
import { Filter } from '@/types';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  search: string;
  setSearch: (s: string) => void;
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({ filter, setFilter, search, setSearch }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-xl text-sm font-medium transition',
              filter === f.value
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full sm:w-52"
        />
      </div>
    </div>
  );
}
