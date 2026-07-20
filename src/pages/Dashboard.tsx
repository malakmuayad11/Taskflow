import Aside from "../components/Aside";
import Header from "../components/Header";
import Statistics from "../components/statistics/Statistics";
import RecentTasksCard from "../components/TasksOverview/RecentTasksCard";
import TasksOverview from "../components/TasksOverview/TasksOverview";
import { getTasks } from "../services/localStorageService";

export default function Dashboard() {
  const tasks = getTasks();
  return (
    <div id="pageLayout">
      <Aside />
      <Header />
      <h2>Dashboard</h2>
      <Statistics />
      <TasksOverview tasks={tasks} />
      <RecentTasksCard tasks={tasks} />
    </div>
  );
}
