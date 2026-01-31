import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export default function HomeRedirect() {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="text-white p-4 loading-spinner">Loading...</div>;
  }

  if (token) {
    return <Navigate to="/todos" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
