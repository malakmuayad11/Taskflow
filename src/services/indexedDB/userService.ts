import type { User } from "../../types/User.ts";
import { hashPassword } from "../HasherService.ts";
import { getDB } from "./indexedDbService.ts";

export async function addUser(user: User): Promise<IDBValidKey> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const index = store.index("emailIndex");
    const checkRequest = index.get(user.email);

    checkRequest.onsuccess = async () => {
      if (checkRequest.result) {
        reject(new Error("User with this email already exists"));
        return;
      }

      const hashedPassword = await hashPassword(user.password);

      const userRecord = {
        ...user,
        userId: user.userId ?? crypto.randomUUID(),
        password: hashedPassword,
      };

      const addRequest = store.add(userRecord);

      addRequest.onsuccess = () => {
        console.log("User with email: " + user.email + " is added");
        resolve(addRequest.result);
      };

      addRequest.onerror = () => {
        reject(addRequest.error ?? new Error("Error adding user."));
      };
    };

    checkRequest.onerror = () => {
      reject(checkRequest.error ?? new Error("Error checking user email."));
    };
  });
}

export function getUser(email: string): Promise<User> {
  const db = getDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("emailIndex");
    const getRequest = index.get(email);

    getRequest.onsuccess = () => {
      const result = getRequest.result;

      if (result) {
        resolve(result as User);
      } else {
        reject(new Error("User not found."));
      }
    };

    getRequest.onerror = () => {
      reject(getRequest.error ?? new Error("Error getting the user."));
    };
  });
}
