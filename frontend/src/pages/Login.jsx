import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { loginRequest } from "../services/authApi.js";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginRequest({ email, password });

      login({ token: res.data.token, user: res.data.user });

      toast.success("Logged in successfully!");
      navigate("/todos");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-[#2A2E35] rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#1C1F26] text-white outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#1C1F26] text-white outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <p className="text-sm text-gray-300">
            Not registered?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              Register here
            </Link>
          </p>

          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
