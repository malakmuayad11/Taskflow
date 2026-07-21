import Aside from "../components/Aside";
import Header from "../components/Header";
import Statistics from "../components/statistics/Statistics";
import RecentTasksCard from "../components/TasksOverview/RecentTasksCard";
import TasksOverview from "../components/TasksOverview/TasksOverview";
import { getTasks } from "../services/localStorageService";
import { useState } from "react";

export default function Dashboard() {
  const tasks = getTasks();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }
  return (
    <div id="pageLayout">
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />
      <h2>Dashboard</h2>
      <Statistics />
      <TasksOverview tasks={tasks} />
      <RecentTasksCard tasks={tasks} />
    </div>
  );
}
