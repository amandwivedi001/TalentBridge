import express from "express";

import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  withdrawApplication,
  updateApplicationStatus,
  getApplicationPipeline,
  getApplicationStats,
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

router.patch(
  "/:jobId/withdraw",
  protect,
  allowRoles("STUDENT"),
  withdrawApplication
);

router.patch(
  "/:applicationId/status",
  protect,
  allowRoles("RECRUITER"),
  updateApplicationStatus
);

router.get(
  "/job/:jobId/pipeline",
  protect,
  allowRoles("RECRUITER"),
  getApplicationPipeline
);

router.get(
  "/stats",
  protect,
  allowRoles("STUDENT"),
  getApplicationStats
);

export default router;