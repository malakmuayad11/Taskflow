import type { TaskStatus, TaskPriority } from "../../types/Task.ts";

interface TaskRowProps {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskRow({
  title,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
}: TaskRowProps) {
  return (
    <tr>
      <td>{title}</td>
      <td>{status}</td>
      <td>{priority}</td>
      <td>
        {dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </td>
      <td>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}
