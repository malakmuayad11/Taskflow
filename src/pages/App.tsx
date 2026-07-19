// import Statistics from "../components/statistics/Statistics.tsx";
// import TaskRow from "../components/Tasks/TaskRow.tsx";
// import TasksTable from "../components/Tasks/TasksTable.tsx";
import TasksList from "../components/Tasks/TasksList.tsx";
import { getTasks } from "../services/localStorageService.ts";

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
    <TasksList initialTasks={getTasks()} />
  );
}
