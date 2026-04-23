"use client";

import { useState } from "react";
import { v4 } from "uuid";

type Task = {
  id: string;
  content: string;
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
    };

    onAddTask(newTask);
    setContent("");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddTaskSubmit(content);
        }}
      >
        <div className="flex gap-2">
          <input
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Adicionar uma nova tarefa"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="bg-blue-500 text-white px-4 rounded" type="submit">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
