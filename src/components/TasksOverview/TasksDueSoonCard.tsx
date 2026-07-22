import type { Task } from "../../types/Task.ts";
import TaskItem from "../Tasks/TaskItem.tsx";
const now = Date.now();

export default function TasksDueSoonCard({ tasks }: { tasks: Task[] }) {
  const dueSoonTasks = tasks.filter(
    (task) => task.dueDate.getTime() - now <= 3 * 60 * 60 * 24 * 1000,
  );

  return (
    <table className="overflow-y-scroll">
      <tbody>
        {dueSoonTasks.length === 0 && <p>No tasks are ending soon.</p>}
        {dueSoonTasks.map((task) => (
          <TaskItem {...task} key={task.taskId} />
        ))}
      </tbody>
    </table>
  );
}
