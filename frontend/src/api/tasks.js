import { api } from "./client";

export function getTasks(page = 1, per_page = 5) {
    return api(`/tasks?page=${page}&per_page=${per_page}`);
}

export function createTask(data) {
    return api("/tasks/", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function updateTask(id, data) {
    return api(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export function deleteTask(id) {
    return api(`/tasks/${id}`, {
        method: "DELETE"
    });
}
