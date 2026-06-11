import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


import { notFound } from "./middleware/notFound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import healthRoutes from "./routes/health.route.js";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";
import recruiterRoutes from "./routes/recruiter.route.js";
import resumeRoutes from "./routes/resume.route.js";
import analyzeRoutes from "./routes/analysis.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";


app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/analysis", analyzeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
