"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import TaskBar from "./components/TaskBar";
import List from "./components/List";
import { Task } from "./types/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const hasLoadedTasks = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      const parsedTasks = (JSON.parse(saved) as Array<
        Partial<Task> & Pick<Task, "id" | "content">
      >).map((task) => ({
        id: task.id,
        content: task.content,
        completed: task.completed ?? false,
      }));

      setTimeout(() => {
        setTasks(parsedTasks);
        hasLoadedTasks.current = true;
      }, 0);
      return;
    }

    hasLoadedTasks.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoadedTasks.current) {
      return;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleToggleTaskCompletion(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleCountTasks() {
    return tasks.length;
  }

  function handleCountCompletedTasks() {
    return tasks.filter((task) => task.completed).length;
  }

  const completedCount = handleCountCompletedTasks();

  return (
    <div className="">
      <header>
        <Header />
      </header>

      <main>
        <div className="py-5 flex flex-col justify-center items-center">
          <TaskBar onAddTask={handleAddTask} />
        </div>
      </main>

      <div className="min-h-full flex flex-col">
        <div className="mx-auto mt-2 flex w-full max-w-200 items-center justify-between px-4">
          
          {/* Tarefas criadas */}
          <span className="font-extrabold text-blue-500 flex items-center gap-2">
            Tarefas Criadas:
            <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm">
              {handleCountTasks()}
            </span>
          </span>

          {/* Tarefas concluídas */}
          <span className="font-extrabold text-purple-800 flex items-center gap-2">
            Concluídas:
            <span
              className={`px-3 py-1 text-white text-sm rounded-full transition-colors
                ${completedCount > 0 ? "bg-green-500" : "bg-gray-400"}
              `}
            >
              {completedCount}
            </span>
          </span>
        </div>

        <List
          handleDeleteTask={handleDeleteTask}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
          tasks={tasks}
        />
      </div>
    </div>
  );
}