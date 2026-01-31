import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/protectRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Todos from "./pages/Todos.jsx";
import HomeRedirect from "./pages/homeRedirect.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Navbar />
              <Todos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
