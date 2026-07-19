// import Statistics from "../components/statistics/Statistics.tsx";
// import TaskRow from "../components/Tasks/TaskRow.tsx";
import TasksTable from "../components/Tasks/TasksTable.tsx";
import type { Task } from "../types/Task.ts";

const tasks: Task[] = [
  {
    id: Date.now(),
    title: "study",
    priority: "Low",
    status: "Todo",
    dueDate: new Date(2026, 6, 28),
  },
];

export default function App() {
  return (
    // <TaskRow
    //   title="Study"
    //   status="In Progress"
    //   priority="High"
    //   dueDate={new Date(2026, 6, 28)}
    //   onDelete={() => {}}
    //   onEdit={() => {}}
    // />
    <TasksTable initialTasks={tasks} />
  );
}
