import Aside from "../components/Aside";
import Header from "../components/Header";
import Statistics from "../components/statistics/Statistics";
import RecentTasksCard from "../components/TasksOverview/RecentTasksCard";
import TasksOverview from "../components/TasksOverview/TasksOverview";
import { getTasksByUserId } from "../services/indexedDB/indexedDbService.ts";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext.ts";
import type { Task } from "../types/Task.ts";

export default function Dashboard() {
  const userId = useContext(UserContext)?.user?.userId;
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);

  useEffect(() => {
    async function getTasks() {
      if (!userId) return;
      const result = await getTasksByUserId(userId);
      setTasks(result);
    }
    getTasks();
  }, [userId]);

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }
  return (
    <div id="pageLayout">
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />
      <h2>Dashboard</h2>
      <Statistics tasks={tasks} />
      <TasksOverview tasks={tasks} />
      <RecentTasksCard tasks={tasks} />
    </div>
  );
}
