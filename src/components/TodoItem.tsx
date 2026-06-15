import { useState } from 'react';
import { Trash2, Pencil, Check, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  changePriority: (id: string, priority: Priority) => void;
};

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
  changePriority,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showPriority, setShowPriority] = useState(false);

  function handleSaveEdit() {
    if (editText.trim()) {
      editTodo(todo.id, editText);
    }
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl border shadow-sm px-4 py-3 flex items-center gap-3 transition group',
        todo.completed ? 'border-slate-100 opacity-70' : 'border-slate-200'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-slate-800"
          />
        ) : (
          <span
            className={clsx(
              'text-sm font-medium block truncate',
              todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge with dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className={clsx(
            'flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-semibold capitalize transition',
            PRIORITY_STYLES[todo.priority]
          )}
        >
          {todo.priority}
          <ChevronDown size={12} />
        </button>
        {showPriority && (
          <div className="absolute right-0 mt-1 z-10 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden w-24">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => {
                  changePriority(todo.id, p);
                  setShowPriority(false);
                }}
                className={clsx(
                  'w-full text-left px-3 py-1.5 text-xs font-semibold capitalize hover:bg-slate-50 transition',
                  PRIORITY_STYLES[p]
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
              title="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              title="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEditing(true);
                setEditText(todo.text);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition opacity-0 group-hover:opacity-100"
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
