import TaskCard from "./TaskCard.tsx";
import type { Task, TaskStatus } from "../../types/Task.ts";
import AddEditTaskForm from "./AddEditTaskForm.tsx";
import { useState } from "react";

type TasksColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  onAdd: (task: Omit<Task, "taskId">) => void;
};

export default function TasksColumn({
  status,
  tasks,
  onAdd,
}: TasksColumnProps) {
  const tasksByStatus = tasks.filter((task) => task.status === status);
  const [isAddingTask, setIsAddingTask] = useState(false);

  function handleSave(addedTask: Omit<Task, "taskId">) {
    onAdd(addedTask);
    setIsAddingTask(false);
  }

  function handleCancel() {
    setIsAddingTask(false);
  }

  return (
    <section>
      {isAddingTask && (
        <AddEditTaskForm
          onCancel={handleCancel}
          isAddMode={true}
          onSave={handleSave}
        />
      )}
      {!isAddingTask && (
        <>
          <div>
            <h3>{status}</h3>
            <p>{tasksByStatus.length}</p>
          </div>
          {tasksByStatus.map((task) => (
            <TaskCard
              key={task.taskId}
              title={task.title}
              dueDate={task.dueDate}
              priority={task.priority}
            />
          ))}
          <button onClick={() => setIsAddingTask(true)}>+ Add Task</button>
        </>
      )}
    </section>
  );
}
