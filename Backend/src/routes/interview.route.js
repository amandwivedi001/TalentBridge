import express from "express"
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import { startInterview } from "../controllers/interview.controller.js";
import validate from "../middleware/validate.middleware.js"
import { startInterviewSchema } from "../validators/interview.validator.js";

const router = express.Router();

router.post(
  "/start",
  protect,
  allowRoles("STUDENT"),
  validate(startInterviewSchema),
  startInterview
);

export default router;