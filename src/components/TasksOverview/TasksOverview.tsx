import TasksCompletionCard from "./TasksCompletionCard.tsx";
import TasksByPriorityCard from "./TasksByPriorityCard.tsx";
import TasksDueSoonCard from "./TasksDueSoonCard.tsx";
import type { Task } from "../../types/Task";

export default function TasksOverview({ tasks }: { tasks: Task[] }) {
  return (
    <section>
      <h2>Tasks Overview</h2>
      <div>
        <TasksCompletionCard tasks={tasks} />
        <TasksByPriorityCard tasks={tasks} />
        <TasksDueSoonCard tasks={tasks} />
      </div>
    </section>
  );
}
