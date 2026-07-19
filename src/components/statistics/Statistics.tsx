import StatCard from "./StatCard.tsx";
import { getTasks } from "../../services/localStorageService.ts";

export default function Statistics() {
  const tasks = getTasks();

  return (
    <section>
      <StatCard title="Total Tasks" statNumber={tasks.length} imageURL="" />
      <StatCard
        title="Completed"
        statNumber={tasks.filter((task) => task.status === "Completed").length}
        imageURL=""
      />
      <StatCard
        title="Pending"
        statNumber={tasks.filter((task) => task.status === "Todo").length}
        imageURL=""
        description="tasks remaining"
      />
      <StatCard
        title="High Priority"
        statNumber={tasks.filter((task) => task.priority === "High").length}
        imageURL=""
      />
    </section>
  );
}
