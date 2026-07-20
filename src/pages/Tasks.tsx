import type { Task } from "../types/Task.ts";
import TasksList from "../components/Tasks/TasksList.tsx";
import TasksHeader from "../components/Tasks/TasksHeader.tsx";

export default function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <TasksHeader />
      <TasksList initialTasks={tasks} />
    </div>
  );
}
