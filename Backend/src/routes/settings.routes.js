import { Router } from "express";

import {

    getProfile,

    updateProfile,

    changePassword,

} from "../controllers/settings.controller.js";

import {

    protect,

} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/profile",
    protect,
    getProfile
);

router.patch(
    "/profile",
    protect,
    updateProfile
);

router.patch(
    "/password",
    protect,
    changePassword
);

export default router;