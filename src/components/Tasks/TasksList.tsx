import ControlBar from "./ControlBar.tsx";
import TasksTable from "./TasksTable.tsx";
import { useState } from "react";
import type { Task } from "../../types/Task.ts";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../../services/localStorageService.ts";
import AddEditTaskForm from "./AddEditTaskForm.tsx";

export default function TasksList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");

  const displayedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSearch(title: string) {
    setSearch(title);
  }

  function handleFilterChange(filter: string) {
    if (filter.toLowerCase() === "newest")
      setTasks((previousTasks) =>
        [...previousTasks].sort((a, b) => b.id - a.id),
      );

    if (filter.toLocaleLowerCase() === "oldest")
      setTasks((previousTasks) =>
        [...previousTasks].sort((a, b) => a.id - b.id),
      );
  }

  function handleAddTask(task: Task) {
    addTask(task); // add it to local storage
    setTasks((previousTasks) => [...previousTasks, task]); // refresh the UI
  }

  function handleDelete(id: number) {
    deleteTask(id); // remove from local storage
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id)); // refresh the UI
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  function handleSave(updatedTask: Task) {
    updateTask(updatedTask); // update the local storage
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    ); // refresh the UI
    setEditingTask(null);
  }

  function handleCancel() {
    setEditingTask(null);
  }

  return (
    <>
      {editingTask ? (
        <AddEditTaskForm
          task={editingTask}
          isAddMode={false}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <section>
          <ControlBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onAdd={handleAddTask}
          />
          <TasksTable
            tasks={displayedTasks}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>
      )}
    </>
  );
}
