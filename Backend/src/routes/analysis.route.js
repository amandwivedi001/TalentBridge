import express from "express";
import { allowRoles, protect } from "../middleware/auth.middleware.js";

import {
  analyzeMyResume,
  getMyAnalysis,
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  allowRoles("STUDENT"),
  analyzeMyResume
);

router.get(
  "/me",
  protect,
  allowRoles("STUDENT"),
  getMyAnalysis
);

export default router;