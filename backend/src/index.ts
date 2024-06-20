import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import projectsRoutes from "./routes/projects";

mongoose.connect(process.env.MONGODB_URL as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectsRoutes);

app.listen(8001, () => {
  console.log("Server Started");
});
