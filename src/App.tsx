import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ListDetails from "./components/ListDetails";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token"),
  );
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setSelectedListId(null);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (selectedListId) {
    return (
      <ListDetails
        listId={selectedListId}
        onBack={() => setSelectedListId(null)}
      />
    );
  }

  return (
    <Dashboard
      onSelectList={(id) => setSelectedListId(id)}
      onLogout={handleLogout}
    />
  );
}
