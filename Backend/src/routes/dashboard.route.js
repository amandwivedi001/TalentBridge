import express from "express"
import {
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

export default router;