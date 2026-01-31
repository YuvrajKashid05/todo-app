import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Duedate from "../components/duedate.jsx";
import { useAuth } from "../context/authContext.jsx";
import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  updateTodoRequest,
} from "../services/todosApi.js";

export default function Todos() {
  const { token } = useAuth();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ add form state
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [duedate, setDuedate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const fetchTodos = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetchTodosRequest();
      setTodos(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  // ✅ add todo submit
  const addTodos = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");

    try {
      setLoading(true);

      await addTodoRequest({
        title,
        priority,
        duedate: duedate || null,
      });

      toast.success("Todo added");

      setTitle("");
      setPriority("Medium");
      setDuedate("");

      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const priorityBar = (p) => {
    if (p === "High") return "bg-red-500";
    if (p === "Medium") return "bg-yellow-400";
    return "bg-green-500";
  };

  const toggleCompleted = async (todo) => {
    try {
      const updatedCompleted = !todo.completed;

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, completed: updatedCompleted } : t,
        ),
      );

      await updateTodoRequest(todo._id, { completed: updatedCompleted });
      toast.success("Todo updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update todo");
      fetchTodos();
    }
  };

  const handleDelete = async (id) => {
    try {
      setTodos((prev) => prev.filter((t) => t._id !== id));
      await deleteTodoRequest(id);
      toast.success("Todo deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete todo");
      fetchTodos();
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title || "");
    setEditPriority(todo.priority || "Medium");
    setEditDueDate(todo.duedate || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditPriority("Medium");
    setEditDueDate("");
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return toast.error("Title is required");

    try {
      await updateTodoRequest(id, {
        title: editTitle,
        priority: editPriority,
        duedate: editDueDate || null,
      });

      toast.success("Todo updated");
      cancelEdit();
      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update todo");
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1F26] text-white py-4 ">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">My Todos</h1>

        <div className="bg-[#2A2E35] rounded-xl p-4 mb-6">
          <form className="grid gap-3 md:grid-cols-6" onSubmit={addTodos}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="md:col-span-3 w-full p-2.5 rounded-lg bg-[#1C1F26] text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter todo title..."
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="md:col-span-1 w-full p-2.5 rounded-lg bg-[#1C1F26] text-white outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <div className="md:col-span-1">
              <Duedate value={duedate} onChange={setDuedate} />
            </div>
            <button
              type="submit"
              className="md:col-span-1 bg-indigo-600 hover:bg-indigo-700  transition px-4 py-2.5 rounded-lg font-medium w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="bg-[#2A2E35] rounded-xl p-4 space-y-3">
          {loading ? (
            <p className="text-gray-300 ">Loading todos...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-400">No todos found.</p>
          ) : (
            todos.map((todo) => {
              const isEditing = editingId === todo._id;

              return (
                <div
                  key={todo._id}
                  className={`flex items-start justify-between rounded-xl p-3 border border-white/5 ${
                    todo.completed ? "bg-[#1C1F26]/60" : "bg-[#1C1F26]"
                  }`}
                >
                  <div className="flex gap-3 w-full ">
                    <div
                      className={`w-2 rounded-full ${priorityBar(
                        todo.priority || "Medium",
                      )}`}
                    />

                    <div className="flex gap-3  w-full items-center">
                      <input
                        type="checkbox"
                        checked={!!todo.completed}
                        onChange={() => toggleCompleted(todo)}
                        className="checkbox checkbox-primary mt-1"
                      />

                      <div className="w-full">
                        {!isEditing ? (
                          <>
                            <p
                              className={`font-medium ${
                                todo.completed
                                  ? "line-through text-gray-400"
                                  : "text-white"
                              }`}
                            >
                              {todo.title}
                            </p>
                            <p
                              className={`text-sm ${
                                todo.completed
                                  ? "text-gray-500"
                                  : "text-gray-400"
                              }`}
                            >
                              Priority: {todo.priority || "Medium"} · Due:{" "}
                              {todo.duedate
                                ? String(todo.duedate).slice(0, 10)
                                : "None"}
                            </p>
                          </>
                        ) : (
                          <div className="grid gap-2 md:grid-cols-3">
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full p-2 rounded bg-[#2A2E35] border border-white/10 outline-none"
                              placeholder="Title"
                            />

                            <select
                              value={editPriority}
                              onChange={(e) => setEditPriority(e.target.value)}
                              className="w-full p-2 rounded bg-[#2A2E35] border border-white/10 outline-none px-2"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>

                            <Duedate
                              value={editDueDate}
                              onChange={setEditDueDate}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    {!isEditing ? (
                      <>
                        <button
                          className="p-2 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5"
                          type="button"
                          onClick={() => startEdit(todo)}
                        >
                          <FiEdit2 size={18} />
                        </button>

                        <button
                          className="p-2 rounded-lg transition text-red-400 hover:text-red-500 hover:bg-red-500/10"
                          type="button"
                          onClick={() => handleDelete(todo._id)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-2 rounded-lg transition text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          type="button"
                          onClick={() => saveEdit(todo._id)}
                        >
                          <FiCheck size={18} />
                        </button>

                        <button
                          className="p-2 rounded-lg transition text-gray-300 hover:text-white hover:bg-white/5"
                          type="button"
                          onClick={cancelEdit}
                        >
                          <FiX size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Tip: High priority tasks are red, Medium is yellow, Low is green.
        </p>
      </div>
    </div>
  );
}
