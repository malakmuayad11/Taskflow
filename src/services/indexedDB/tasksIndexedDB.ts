import type { Task } from "../../types/Task.ts";
import { getDB } from "./indexedDbService.ts";

export function addTask(task: Task) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    const index = store.index("userIdIndex");
    const checkRequest = index.get(task.userId);

    checkRequest.onsuccess = async () => {
      if (checkRequest.result) {
        reject(new Error("User with this email already exists"));
        return;
      }

      const taskRecord = {
        ...task,
        taskId: task.taskId ?? 0,
      };

      const addRequest = store.add(taskRecord);

      addRequest.onsuccess = () => {
        console.log("Task with title: " + task.title + " is added");
        resolve(addRequest.result);
      };

      addRequest.onerror = () => {
        reject(addRequest.error ?? new Error("Error adding task."));
      };
    };

    checkRequest.onerror = () => {
      reject(checkRequest.error ?? new Error("Error checking user id."));
    };
  });
}

export function updateTask(task: Task): Promise<IDBValidKey> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    const check = store.get(task.taskId);

    check.onsuccess = () => {
      if (check.result === undefined) {
        reject(new Error("Task with id: " + task.taskId + " is not found"));
        return;
      }

      const updatedTask = { ...task };
      const updateRequest = store.put(updatedTask);

      updateRequest.onsuccess = () => {
        resolve(updateRequest.result);
      };

      updateRequest.onerror = () => {
        reject(updateRequest.error ?? new Error("Error updating task."));
      };
    };

    check.onerror = () => {
      reject(check.error ?? new Error("Error checking task."));
    };
  });
}

export function deleteTask(taskId: number) {
  const db = getDB();
  if (!db) {
    console.log("Database is not initialized.");
    return;
  }

  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");

  tx.oncomplete = () => {
    console.log("Task id deleted successfully");
  };

  tx.onerror = () => {
    console.log("Error while deleting the task");
  };

  const check = store.get(taskId);

  check.onsuccess = () => {
    if (check.result === undefined) {
      console.log("Task is not found");
      return;
    }
    store.delete(taskId);
  };

  check.onerror = () => {
    console.log("Error while deleting the task");
  };
}

export function getTasksByUserId(userId: number): Promise<Task[]> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction("tasks", "readonly");

    const store = transaction.objectStore("tasks");

    const index = store.index("userIdIndex");

    const request = index.getAll(userId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
