"use client";

import { useEffect, useRef, useState } from "react";
import { Task } from "../types/tasks";

/**
 * HOOK: useTasks
 *
 * RESPONSABILIDADE:
 * Gerenciar todas as tarefas:
 * - carregar do localStorage
 * - salvar no localStorage
 * - adicionar tarefas
 * - deletar tarefas
 * - alternar status
 */

export function useTasks() {

  // Estado principal
  const [tasks, setTasks] = useState<Task[]>([]);

  // Controle de carregamento
  const hasLoadedTasks = useRef(false);

  /**
   * Carrega tarefas do localStorage
   */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      const parsedTasks = JSON.parse(saved) as Task[];

      setTimeout(() => {
        setTasks(parsedTasks);
        hasLoadedTasks.current = true;
      }, 0);

      return;
    }

    hasLoadedTasks.current = true;
  }, []);

  /**
   * Salva tarefas no localStorage
   */
  useEffect(() => {
    if (!hasLoadedTasks.current) return;

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  /**
   * Adiciona tarefa
   */
  function addTask(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  /**
   * Remove tarefa
   */
  function deleteTask(id: string) {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  }

  /**
   * Alterna status
   */
  function toggleTaskCompletion(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
  };
}