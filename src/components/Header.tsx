import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
        <CheckSquare className="text-white" size={26} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-800 leading-tight">My Todos</h1>
        <p className="text-slate-500 text-sm">Stay organized, stay productive</p>
      </div>
    </div>
  );
}
