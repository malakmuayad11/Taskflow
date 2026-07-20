import type { Task } from "../types/Task.ts";
import TasksBoard from "../components/Tasks/TasksBoard.tsx";

export default function TaskKanbanView({ tasks }: { tasks: Task[] }) {
  return <TasksBoard initialTasks={tasks} />;
}
