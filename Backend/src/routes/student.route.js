import express from "express"
import { protect, allowRoles } from "../middleware/auth.middleware.js";
import { getStudentProfile } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/profile", protect, allowRoles("STUDENT"), getStudentProfile);

export default router;