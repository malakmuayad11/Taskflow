import type { Task } from "../types/Task.ts";

const tasks: Task[] = [];

export function addTask(task: Task): void {
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function editTask(task: Task): void {
  const index = tasks.findIndex((t) => t.id === task.id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

export function deleteTask(id: number) {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks.filter((t) => t.id !== id)),
  );
}

export function getTasks(): Task[] {
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? (JSON.parse(tasksJson) as Task[]) : [];
}
