import type { User } from "../types/User.ts";

let db: IDBDatabase | null = null;

const request = indexedDB.open("TaskFlow", 2);

request.onupgradeneeded = function () {
  const openRequest = request as IDBOpenDBRequest;
  db = openRequest.result;

  if (!db.objectStoreNames.contains("users")) {
    const store = db.createObjectStore("users", { keyPath: "userId" });
    store.createIndex("emailIndex", "email", { unique: true });
    console.log("Object store 'users' created.");
  }
};

request.onsuccess = function () {
  const openRequest = request as IDBOpenDBRequest;
  db = openRequest.result;
};

request.onerror = function () {
  console.log(`Error opening DB: `, request.error);
};

export function addUser(user: User): Promise<IDBValidKey> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const index = store.index("emailIndex");
    const checkRequest = index.get(user.email);

    checkRequest.onsuccess = () => {
      if (checkRequest.result) {
        reject(new Error("User with this email already exists"));
        return;
      }

      const userRecord = {
        ...user,
        userId: user.userId ?? crypto.randomUUID(),
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
