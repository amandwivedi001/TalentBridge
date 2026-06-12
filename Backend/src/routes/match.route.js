import express from "express"
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import { generateMatchForApplication, getRankedCandidates } from "../controllers/match.controller.js";

const router = express.Router();

router.post("/generate/:applicationId", protect, allowRoles("RECRUITER"), generateMatchForApplication);

router.get(
  "/job/:jobId",
  protect,
  allowRoles("RECRUITER"),
  getRankedCandidates
);

export default router;