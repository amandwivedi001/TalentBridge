import { Router } from "express";

import {
    getRecruiterAnalytics,
} from "../controllers/analytics.controller.js";

import {
    protect,
    allowRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/recruiter",
    protect,
    allowRoles("RECRUITER"),
    getRecruiterAnalytics
);

export default router;