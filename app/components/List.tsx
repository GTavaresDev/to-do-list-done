"use client";

import { Trash } from "lucide-react";
import { Task } from "../types/tasks";

/* Aqui eu to falando que o componente de lista vai receber as seguintes props: 
* Um array contendo as tarefas
* a função que delata uma task baseada no id 
* e a função que altera o status de uma tarefa baseada no id dela 
*/
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
        {(!tasks || tasks.length === 0) && (
          <li
            className="flex flex-col items-center justify-center rounded-lg bg-gray-800 px-4 py-3 text-white shadow-md"
            key="empty-list"
          >
            <span className="font-extrabold text-gray-400">Voce ainda não tem tarefas cadastradas</span>
            <span className="text-gray-400">Crie tarefas e organize seus itens a fazer</span>
          </li>
        )}

        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex w-full items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-white shadow-md"
          >
            {/* CÍRCULO */}
            <button
              onClick={() => handleToggleTaskCompletion(task.id)}
              className={`h-6 w-6 rounded-full border-2 transition-all cursor-pointer ${
                task.completed
                  ? "bg-purple-800 border-purple-800"
                  : "border-blue-500 bg-transparent"
              }`}
            />

            {/* TEXTO */}
            <span
              className={`mx-4 flex-1 text-center ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.content}
            </span>

            {/* LIXEIRA */}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="flex items-center justify-center rounded p-2 text-red-400 hover:bg-gray-700 hover:text-red-500 transition-all cursor-pointer"
            >
              <Trash size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}