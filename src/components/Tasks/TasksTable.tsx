import TaskRow from "./TaskRow.tsx";
import type { Task } from "../../types/Task.ts";
import { useState } from "react";
import AddEditTaskForm from "./AddEditTaskForm.tsx";

export default function TasksTable({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleDelete(id: number) {
    setTasks([...tasks].filter((task) => task.id !== id));
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  function handleCancel() {
    setEditingTask(null);
  }

  return (
    <>
      {editingTask && (
        <AddEditTaskForm
          task={editingTask}
          isAddMode={false}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              {...task}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
