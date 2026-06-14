import { Router } from "express";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.patch(
  "/read-all",
  protect,
  markAllNotificationsAsRead
);

router.patch(
  "/:id/read",
  protect,
  markNotificationAsRead
);

export default router;