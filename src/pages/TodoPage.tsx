import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Header />
        <AddTodoForm addTodo={todoState.addTodo} />
        <FilterBar
          filter={todoState.filter}
          setFilter={todoState.setFilter}
          search={todoState.search}
          setSearch={todoState.setSearch}
        />
        <TodoList
          todos={todoState.todos}
          toggleTodo={todoState.toggleTodo}
          deleteTodo={todoState.deleteTodo}
          editTodo={todoState.editTodo}
          changePriority={todoState.changePriority}
        />
        <StatsBar
          activeCount={todoState.activeCount}
          completedCount={todoState.completedCount}
          clearCompleted={todoState.clearCompleted}
        />
      </div>
    </div>
  );
}
