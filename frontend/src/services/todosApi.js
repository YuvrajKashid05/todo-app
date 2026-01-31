import api from "./api";

export const fetchTodosRequest = () => api.get("/api/todos");
export const addTodoRequest = (data) => api.post("/api/todos", data);
export const updateTodoRequest = (id, data) => api.put(`/api/todos/${id}`, data);
export const deleteTodoRequest = (id) => api.delete(`/api/todos/${id}`);
