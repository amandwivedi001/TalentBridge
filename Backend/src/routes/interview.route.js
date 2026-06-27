import express from "express"
import { allowRoles, protect } from "../middleware/auth.middleware.js";
import { completeInterview, getInterviewDetails, getInterviewHistory, getInterviewReport, getInterviewStats, startInterview, submitAnswer } from "../controllers/interview.controller.js";
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

router.post(
  "/:sessionId/complete",
  protect,
  allowRoles("STUDENT"),
  completeInterview
);

router.get(
  "/history",
  protect,
  allowRoles("STUDENT"),
  getInterviewHistory
);

router.get(
  "/stats",
  protect,
  allowRoles("STUDENT"),
  getInterviewStats
);

router.get(
  "/:sessionId",
  protect,
  allowRoles("STUDENT"),
  getInterviewDetails
);

router.get(
    "/:sessionId/report",
    protect,
    allowRoles("STUDENT"),
    getInterviewReport
);

export default router;