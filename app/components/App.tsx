"use client";

import Header from "./Header";
import TaskBar from "./TaskBar";
import List from "./List";
import { useTasks } from "../hooks/useTasks";

export default function App() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTasks();

  return (
    <>
      <Header/>
      <TaskBar onAddTask={addTask} />
      <List
        tasks={tasks}
        handleDeleteTask={deleteTask}
        handleToggleTaskCompletion={toggleTaskCompletion}
      />
    </>
  );
}
