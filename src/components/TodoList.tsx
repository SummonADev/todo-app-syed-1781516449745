import { Todo, Priority } from '@/types';
import TodoItem from '@/components/TodoItem';
import { ClipboardList } from 'lucide-react';

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  changePriority: (id: string, priority: Priority) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
  changePriority,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
        <ClipboardList size={48} strokeWidth={1.5} />
        <p className="text-base font-medium">No tasks found</p>
        <p className="text-sm">Add a new task or change your filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          changePriority={changePriority}
        />
      ))}
    </div>
  );
}
