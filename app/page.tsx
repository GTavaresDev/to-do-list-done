"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import TaskBar from "./components/TaskBar";
import List from "./components/List";
import { Task } from "./types/tasks";

export default function Home() {
  /*Aqui é criado um estado (um valor que pode mudar ao longo do tempo e que controla o que aparece na tela.) chamado "tasks"
  *E uma função chamada "setTasks"
  **/
  const [tasks, setTasks] = useState<Task[]>([]);
/**
 * Aqui eu uso esse hasLoadedTasks porque:
 * Quando o usuário entra no sistema, o componente
 * é carregado e o estado "tasks" começa vazio ([]).
 * Porém, o localStorage pode já ter tarefas salvas
 * de acessos anteriores.
 * Se o sistema salvasse nesse momento, o localStorage
 * receberia [] e apagaria as tarefas que já estavam salvas.
 * O hasLoadedTasks é usado para garantir que o
 * localStorage só seja atualizado depois que as
 * tarefas forem carregadas corretamente.
 */

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
  console.log(tasks);

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
      <div className="min-h-full flex flex-col">
        <div className="mx-auto mt-2 flex w-full max-w-200 items-center justify-between px-4">
          <span className="font-semibold">Tarefas Criadas</span>
          <span className="font-semibold">Concluidas</span>
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
