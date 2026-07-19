import TaskRow from "./TaskRow.tsx";
import type { Task } from "../../types/Task.ts";
import { useState } from "react";
import AddEditTaskForm from "./AddEditTaskForm.tsx";

export default function TasksTable({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleDelete(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }
  function handleUpdate(updatedTask: Task) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

    setEditingTask(null);
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
          onSave={handleUpdate}
          onCancel={handleCancel}
        />
      )}
      {!editingTask && (
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
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
