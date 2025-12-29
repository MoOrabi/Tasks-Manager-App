import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register({ onRegistered }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await registerUser(form);
            setMsg("Account created — you can now log in.");
            onRegistered();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="container">
            <h2>Register</h2>

            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    value={form.name}
                    placeholder="Name"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

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

                <button type="submit">Register</button>
            </form>
        </div>
    );

}
