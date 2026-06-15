import clsx from 'clsx';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  clearCompleted: () => void;
};

export default function StatsBar({ activeCount, completedCount, clearCompleted }: StatsBarProps) {
  const total = activeCount + completedCount;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          <span className="font-bold text-slate-700">{activeCount}</span> task{activeCount !== 1 ? 's' : ''} remaining
        </span>
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-rose-500 hover:text-rose-600 font-medium text-xs transition hover:underline"
          >
            Clear {completedCount} completed
          </button>
        )}
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={clsx(
            'h-2 rounded-full transition-all duration-500',
            progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-400 text-right">{progress}% complete</p>
    </div>
  );
}
