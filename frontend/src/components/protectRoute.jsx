import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
