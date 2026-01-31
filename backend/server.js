import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://todo-app-omega-ashen.vercel.app/"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));
