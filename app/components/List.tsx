"use client";

type Task = {
  id: string;
  content: string;
  completed: boolean;
};

type ListProps = {
  tasks: Task[];
  handleDeleteTask(id: string): void;
  handleToggleTaskCompletion(id: string): void;
};

export default function List({
  tasks,
  handleDeleteTask,
  handleToggleTaskCompletion,
}: ListProps) {
  return (
    <div className="mx-auto mt-4 w-full max-w-200 px-4">
      <ul className="flex flex-col gap-6">
        {tasks.map((task) => (
          <li
          key={task.id}
          className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-white shadow-md"
        >
          <button
            onClick={() => handleToggleTaskCompletion(task.id)}
            className="rounded px-4 text-white"
          >
            {task.completed ? <span className=" px-2 py-2 rounded bg-green-500">✅</span> : <span className=" px-2 py-2 rounded bg-red-500">❌</span>}
          </button>
        
          <span className="mx-4 text-center flex-1">
            {task.content}
          </span>
        
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="rounded bg-red-500 px-4 text-white"
          >
            Apagar
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
