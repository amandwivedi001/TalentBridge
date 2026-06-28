import express from "express";

import {
  createJob,
  getMyJobs,
  getJobById,
  getAllJobs,
  deleteJob,
  updateJob,
  toggleJobStatus,
} from "../controllers/job.controller.js";

import {
  protect,
  allowRoles,
} from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  createJobSchema,
} from "../validators/job.validator.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("RECRUITER"),
  validate(createJobSchema),
  createJob
);

router.get(
  "/my-jobs",
  protect,
  allowRoles("RECRUITER"),
  getMyJobs
);

router.get(
  "/:id",
  protect,
  getJobById
);

router.get(
  "/",
  protect,
  getAllJobs
);

router.patch(
  "/:jobId",
  protect,
  allowRoles("RECRUITER"),
  updateJob
);

router.delete(
  "/:jobId",
  protect,
  allowRoles("RECRUITER"),
  deleteJob
);

router.patch(
  "/:jobId/status",
  protect,
  allowRoles("RECRUITER"),
  toggleJobStatus
);

export default router;