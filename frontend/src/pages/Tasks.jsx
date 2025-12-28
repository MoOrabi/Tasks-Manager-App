import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
    const { logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
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
        setError("");
        try {
            const res = await createTask({title, description});
            setTitle("");
            setDescription("");
            load();
        } catch (err) {
            console.log(err);
            console.log(err.message);
            
            setError(err.message)
        }
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
    
    return (
        <div className="container">
            <h2>My Tasks</h2>

            <div className="column-container">
                <button className="logout-btn" onClick={logout}>Logout</button>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleCreate}>
                    <input
                        name="title"
                        value={title}
                        placeholder="Task title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        name="description"
                        value={description}
                        placeholder="Task description"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>
            

            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        <div className="task-top">
                            <strong>{t.title}</strong>
                            <span className={`status ${t.status}`}>{t.status}</span>
                        </div>

                        <p>{t.description}</p>

                        <select
                            value={t.status}
                            onChange={e => handleUpdate(t.id, e.target.value)}
                        >
                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="done">done</option>
                        </select>

                        <button className="danger" onClick={() => handleDelete(t.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
