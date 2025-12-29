const API_URL = "http://localhost:5000";

export async function api(path, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 422) {
            window.location = "/login"; // redirect
            return;
        }
        throw new Error((await res.json()).message || "Request failed");
    }

    return res.json();
}
