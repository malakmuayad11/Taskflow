import type { FormEvent } from "react";
import { getUser } from "../../services/indexedDbService.ts";
import { useState } from "react";
import "../../styles/index.css";
import { hashPassword } from "../../services/HasherService.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFound, setIsFound] = useState(true);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const user = await getUser(email);
      if (user && user.password === (await hashPassword(password))) {
        setIsFound(true);
        // go to the dashboard
      } else {
        setIsFound(false);
      }
    } catch {
      setIsFound(false);
    }
  }

  return (
    <form onSubmit={login}>
      <div
        className={
          isFound ? "hidden" : "bg-red-300 border border-red-500 p-2 m-2"
        }
      >
        <p>Email or Password is wrong, please try again.</p>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
