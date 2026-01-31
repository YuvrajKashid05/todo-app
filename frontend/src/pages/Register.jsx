import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/authApi.js";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerRequest({ name, email, password });

      toast.success("Registered successfully! Please login.");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen ">
      <div className="bg-[#2A2E35] rounded-lg p-6 w-md">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Register Page
        </h1>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleRegister}
        >
          <div>
            <label
              className="text-white block mb-2 text-sm text-bold"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-[#1C1F26] text-white outline-none"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label
              className="text-white block mb-2 text-sm text-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#1C1F26] text-white outline-none"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label
              className="text-white block mb-2 text-sm text-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#1C1F26] text-white outline-none"
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <span className="items-start text-white px-2">
              Already have an account?
            </span>
            <a href="/login" className="text-blue-500">
              Login here
            </a>
          </div>
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            disabled={loading}
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
