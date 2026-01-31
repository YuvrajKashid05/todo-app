import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#1C1F26] text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/todos" className="text-xl font-bold">
          TodoApp
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/todos"
            className="text-gray-300 hover:text-indigo-600 transition text-sm"
          >
            Todos
          </Link>

          <span className="text-gray-300">
            {user?.name || user?.email || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-[#2A2E35] transition"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-[#2A2E35] rounded-lg p-4 flex flex-col gap-3">
            <Link
              to="/todos"
              className="text-gray-200 hover:bg-indigo-600 transition py-2 rounded-lg text-sm"
              onClick={() => setOpen(false)}
            >
              Todos
            </Link>

            <span className="text-gray-300">
              {user?.name || user?.email || "User"}
            </span>

            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
