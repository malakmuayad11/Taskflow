import TaskRow from "./TaskRow.tsx";
import type { Task } from "../../types/Task.ts";
// import { useState } from "react";
// import AddEditTaskForm from "./AddEditTaskForm.tsx";

// type TasksTableProps = {
//   tasks: Task[];
//   onDelete: (id: number) => void;
//   onEdit: (task: Task) => void;
// };

// export default function TasksTable({
//   tasks,
//   onDelete,
//   onEdit,
// }: TasksTableProps) {
//   // const [tasks, setTasks] = useState(initialTasks);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   // function handleDelete(id: number) {
//   //   setTasks(tasks.filter((task) => task.id !== id));
//   // }

//   function handleEdit(task: Task) {
//     setEditingTask(task);
//   }
//   // function handleUpdate(updatedTask: Task) {
//   //   setTasks((previousTasks) =>
//   //     previousTasks.map((task) =>
//   //       task.id === updatedTask.id ? updatedTask : task,
//   //     ),
//   //   );

//   //   setEditingTask(null);
//   // }

//   function handleCancel() {
//     setEditingTask(null);
//   }

//   return (
//     <>
//       {editingTask && (
//         <AddEditTaskForm
//           task={editingTask}
//           isAddMode={false}
//           onSave={handleUpdate}
//           onCancel={handleCancel}
//         />
//       )}
//       {!editingTask && (
//         <table>
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Due Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <TaskRow
//                 key={task.id}
//                 {...task}
//                 onEdit={() => onEdit(task)}
//                 onDelete={() => onDelete(task.id)}
//               />
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// }

type TasksTableProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
};

export default function TasksTable({
  tasks,
  onDelete,
  onEdit,
}: TasksTableProps) {
  return (
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
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
