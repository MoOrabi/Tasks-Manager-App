import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import './App.css';

export default function App() {
  const { token } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  if (!token) {
    return showLogin ? (
      <>
        <Login onLoggedIn={() => { }} />
        <p className="container">
          No account? <button onClick={() => setShowLogin(false)}>Register</button>
        </p>
      </>
    ) : (
      <>
        <Register onRegistered={() => setShowLogin(true)} />
        <p className="container">
          Already have an account?{" "}
          <button onClick={() => setShowLogin(true)}>Login</button>
        </p>
      </>
    );
  }

  return <Tasks/>
}
