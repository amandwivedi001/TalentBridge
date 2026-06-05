import express from "express"
import { protect, allowRoles } from "../middleware/auth.middleware.js";
import { getRecruiterProfile } from "../controllers/recruiter.controller.js";

const router = express.Router();

router.get("/profile", protect, allowRoles("RECRUITER"), getRecruiterProfile);

export default router;