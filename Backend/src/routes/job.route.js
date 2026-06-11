import express from "express";

import {
  createJob,
  getMyJobs,
  getJobById,
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

export default router;