export type TaskStatus = "In Progress" | "Todo" | "Completed";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
}
