"use client";

import { useState } from "react";
import { v4 } from "uuid";

type Task = {
  id: string;
  content: string;
  completed: boolean;
};

type TaskBarProps = {
  onAddTask: (task: Task) => void;
};

export default function TaskBar({ onAddTask }: TaskBarProps) {
  const [content, setContent] = useState("");

  function onAddTaskSubmit(content: string) {
    if (!content.trim()) return;

    const newTask = {
      id: v4(),
      content,
      completed: false,
    };

    onAddTask(newTask);
    setContent("");
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-200 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddTaskSubmit(content);
        }}
      >
        <div className="flex items-center gap-4">
          
          {/* INPUT (barra estilo lista) */}
          <div className="flex flex-1 items-center rounded-lg bg-gray-500 px-4 py-3 shadow-md">
            <input
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              type="text"
              placeholder="Adicionar uma nova tarefa"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* BOTÃO FORA */}
          <button
            className="rounded bg-gray-500 px-4 py-3 text-white hover:bg-blue-600 transition-all"
            type="submit"
          >
            Criar
          </button>

        </div>
      </form>
    </div>
  );
}