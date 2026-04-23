"use client";

type Task = {
  id: string;
  content: string;
};

type ListProps = {
  tasks: Task[];
  handleDeleteTask(id: string): void;
};

export default function List({ tasks, handleDeleteTask }: ListProps) {
  return (
    <div className="mx-auto mt-4 w-full max-w-200 px-4">
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white shadow-md"
          >
            {task.content}
            <button onClick={() => handleDeleteTask(task.id)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
