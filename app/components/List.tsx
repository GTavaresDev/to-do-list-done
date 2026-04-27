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
            <div className="w-16">
              {!task.completed && (
                <button
                  onClick={() => handleToggleTaskCompletion(task.id)}
                  className="rounded bg-green-500 px-3 py-2 text-white"
                >
                  ✅
                </button>
              )}
            </div>

            <span
              className={`mx-4 flex-1 text-center ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
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