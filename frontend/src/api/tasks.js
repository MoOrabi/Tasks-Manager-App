import { api } from "./client";

export function getTasks() {
    return api("/tasks/");
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
