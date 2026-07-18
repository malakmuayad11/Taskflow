import TaskRow from "../components/Tasks/TaskRow.tsx";

export default function App() {
  return (
    <TaskRow
      title="Study"
      status="In Progress"
      priority="High"
      dueDate={new Date(2026, 6, 28)}
      onDelete={() => {}}
      onEdit={() => {}}
    />
  );
}
