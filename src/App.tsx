// import Dashboard from "./pages/Dashboard.tsx";
import TasksBoard from "./components/Tasks/TasksBoard.tsx";
// import Tasks from "./pages/Tasks.tsx";
import { getTasks } from "./services/localStorageService";

export default function App() {
  return <TasksBoard initialTasks={getTasks()} />;
}
