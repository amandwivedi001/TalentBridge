import express from "express"
import {
    getRecruiterDashboard,
  getStudentDashboard,
} from "../controllers/dashboard.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get(
  "/student",
  protect,
  allowRoles("STUDENT"),
  getStudentDashboard
);

router.get(
  "/recruiter",
  protect,
  allowRoles("RECRUITER"),
  getRecruiterDashboard
);

export default router;