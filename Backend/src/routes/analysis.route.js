import express from "express"
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import { analyzeMyResume } from "../controllers/analysis.controller.js";
const router = express.Router();

router.get("/test", protect, allowRoles("STUDENT"),analyzeMyResume);

export default router;