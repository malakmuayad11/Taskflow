import ControlBar from "./ControlBar.tsx";
import TasksTable from "./TasksTable.tsx";
import { useState } from "react";
import type { Task } from "../../types/Task.ts";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../../services/indexedDB/indexedDbService.ts";
import AddEditTaskForm from "./AddEditTaskForm.tsx";
import PaginationRow from "./PaginationRow.tsx";
import { paginateArray } from "../../services/paginationService.tsx";

export default function TasksList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(paginateArray(initialTasks, 1, 5));
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
        [...previousTasks].sort((a, b) => b.taskId - a.taskId),
      );

    if (filter.toLocaleLowerCase() === "oldest")
      setTasks((previousTasks) =>
        [...previousTasks].sort((a, b) => a.taskId - b.taskId),
      );
  }

  function handleAddTask(task: Omit<Task, "taskId">) {
    const newTask: Task = { ...task, taskId: Date.now() };
    addTask(newTask); // add it to indexedDB
    setTasks((previousTasks) => [...previousTasks, newTask]); // refresh the UI
  }

  function handleDelete(id: number) {
    deleteTask(id); // remove from indexedDB
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.taskId !== id),
    ); // refresh the UI
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  function handleSave(taskData: Omit<Task, "taskId">) {
    const updatedTask: Task = { ...taskData, taskId: editingTask!.taskId };
    updateTask(updatedTask); // update the indexedDB
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task,
      ),
    ); // refresh the UI
    setEditingTask(null);
  }

  function handleCancel() {
    setEditingTask(null);
  }

  function handleClick(pageNum: number) {
    setTasks(paginateArray(initialTasks, pageNum, 5));
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
          <PaginationRow
            totalTasks={initialTasks.length}
            onclick={handleClick}
          />
        </section>
      )}
    </>
  );
}
