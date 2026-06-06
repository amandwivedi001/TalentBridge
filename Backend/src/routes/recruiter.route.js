import express from "express";

import {
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../controllers/recruiter.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { recruiterProfileSchema } from "../validators/recruiter.validator.js";
const router = express.Router();

router
  .route("/profile")
  .get(protect, allowRoles("RECRUITER"), getRecruiterProfile)
  .put(protect, allowRoles("RECRUITER"), validate(recruiterProfileSchema), updateRecruiterProfile);

export default router;