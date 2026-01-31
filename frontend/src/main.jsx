import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>

    <Toaster
      position="top-center"
      toastOptions={{
        style: { background: "#1C1F26", color: "#fff" },
      }}
    />
  </React.StrictMode>,
);
