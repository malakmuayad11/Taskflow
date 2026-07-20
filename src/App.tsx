// import Dashboard from "./pages/Dashboard.tsx";
import Tasks from "./pages/Tasks.tsx";
import { getTasks } from "./services/localStorageService";

export default function App() {
  return <Tasks tasks={getTasks()} />;
}
