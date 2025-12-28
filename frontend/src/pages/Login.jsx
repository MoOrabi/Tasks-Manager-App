import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login({ onLoggedIn }) {
  const { login: saveToken } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      saveToken(res.access_token);
      onLoggedIn();
    } catch (err) {
        console.log(err);
        console.log(err.message);
        
      setError(err.message);
    }
  }

    return (
        <div className="container">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    value={form.email}
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    value={form.password}
                    placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );

}
