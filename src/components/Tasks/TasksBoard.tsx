import type { Task } from "../../types/Task.ts";
import { useState } from "react";
import { addTask } from "../../services/localStorageService.ts";
import AddEditTaskForm from "./AddEditTaskForm.tsx";
import TasksColumn from "./TasksColumn";

export default function TasksBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(task: Task) {
    addTask(task); // add it to local storage
    setTasks((previousTasks) => [...previousTasks, task]); // refresh the UI
  }
  function handleSave(addedTask: Task) {
    handleAddTask(addedTask);
    setIsAddingTask(false);
  }
  function handleCancel() {
    setIsAddingTask(false);
  }

  return (
    <>
      {isAddingTask ? (
        <AddEditTaskForm
          isAddMode={true}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <TasksColumn status="Todo" tasks={tasks} onAdd={handleAddTask} />
          <TasksColumn
            status="In Progress"
            tasks={tasks}
            onAdd={handleAddTask}
          />
          <TasksColumn status="Completed" tasks={tasks} onAdd={handleAddTask} />
        </div>
      )}
    </>
  );
}
