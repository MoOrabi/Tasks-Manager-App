import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
    const { logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load() {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleCreate(e) {
        e.preventDefault();
        await createTask({ title });
        setTitle("");
        load();
    }

    async function handleUpdate(id, status) {
        await updateTask(id, { status });
        load();
    }

    async function handleDelete(id) {
        await deleteTask(id);
        load();
    }

    if (loading) return <p>Loading…</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h2>My Tasks</h2>

            <button onClick={logout}>Logout</button>

            <form onSubmit={handleCreate}>
                <input
                    value={title}
                    placeholder="Task title"
                    onChange={e => setTitle(e.target.value)}
                />
                <button>Add Task</button>
            </form>

            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        <strong>{t.title}</strong> — {t.status}

                        <select
                            value={t.status}
                            onChange={e => handleUpdate(t.id, e.target.value)}
                        >
                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="done">done</option>
                        </select>

                        <button onClick={() => handleDelete(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
