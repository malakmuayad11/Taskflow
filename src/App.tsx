import { UserProvider } from "./context/UserProvider.tsx";
import StartPage from "./pages/StartPage.tsx";

export default function App() {
  return (
    <UserProvider>
      <StartPage />
    </UserProvider>
  );
}
