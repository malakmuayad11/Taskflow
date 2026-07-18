import type { Task } from "../types/Task.ts";

const tasks: Task[] = [];

export function addTask(task: Task): void {
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks(): Task[] {
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? (JSON.parse(tasksJson) as Task[]) : [];
}
