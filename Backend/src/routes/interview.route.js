import express from "express"
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import { startInterview, submitAnswer } from "../controllers/interview.controller.js";
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

router.post(
  "/questions/:questionId/answer",
  protect,
  allowRoles("STUDENT"),
  submitAnswer
);

export default router;