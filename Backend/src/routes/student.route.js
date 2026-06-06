import express from "express";

import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/student.controller.js";
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { studentProfileSchema } from "../validators/student.validator.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, allowRoles("STUDENT"), getStudentProfile)
  .put(protect, allowRoles("STUDENT"), validate(studentProfileSchema), updateStudentProfile);

export default router;