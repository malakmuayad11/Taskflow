import { useState } from "react";
// import { addTask } from "../../services/localStorageService.ts";
import type { Task } from "../../types/Task.ts";
import AddEditTaskForm from "./AddEditTaskForm.tsx";

export default function ControlBar({
  onFilterChange,
  onAdd,
}: {
  onFilterChange: (value: string) => void;
  onAdd: (addedTask: Task) => void;
}) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  function handleSave(addedTask: Task) {
    onAdd(addedTask);
    // addTask(addedTask);
    setIsAddingTask(false);
  }

  function handleCancel() {
    setIsAddingTask(false);
  }

  return (
    <>
      {isAddingTask && (
        <AddEditTaskForm
          onCancel={handleCancel}
          isAddMode={true}
          onSave={handleSave}
        />
      )}
      {!isAddingTask && (
        <div>
          <input type="search" placeholder="Search tasks..." />
          <label>Filters</label>
          <select onChange={(e) => onFilterChange(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button onClick={() => setIsAddingTask(true)}>+ Add Task</button>
        </div>
      )}
    </>
  );
}
