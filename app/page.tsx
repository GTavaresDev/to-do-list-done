"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskBar from "./components/TaskBar";
import List from "./components/List";

type Task = {
  id: string;
  content: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  return (
    <div className="">
      <header>
        <Header />
      </header>
      <main className="">
        <div className="py-5 flex flex-col justify-center items-center ">
          <TaskBar onAddTask={handleAddTask} />
        </div>
      </main>
      <body className="w-full">
        <div className="mx-auto mt-2 flex w-full max-w-200 items-center justify-between px-4">
          <span className="font-semibold">Tarefas Criadas</span>
          <span className="font-semibold">Concluidas</span>
        </div>
        <List tasks={tasks} />
      </body>
    </div>
  );
}
