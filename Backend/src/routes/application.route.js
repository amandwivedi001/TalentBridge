import express from "express";

import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
} from "../controllers/application.controller.js";

import {
  protect,
  allowRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  allowRoles("STUDENT"),
  applyToJob
);

router.get(
  "/my-applications",
  protect,
  allowRoles("STUDENT"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  allowRoles("RECRUITER"),
  getApplicantsForJob
);

export default router;