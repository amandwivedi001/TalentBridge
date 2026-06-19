import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
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
import matchRoutes from "./routes/match.route.js";
import interviewRoutes from "./routes/interview.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import notificationRoutes from "./routes/notification.route.js";


app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/analysis", analyzeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/matches",matchRoutes);
app.use("/api/interviews",interviewRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/notifications",notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
