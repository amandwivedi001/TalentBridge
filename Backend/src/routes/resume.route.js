import { getMyResume, uploadResume } from "../controllers/resume.controller.js";
import {protect, allowRoles } from "../middleware/auth.middleware.js";
import express from "express"

const router = express.Router();

router.get("/me",protect,allowRoles("STUDENT"), getMyResume)
router.post("/upload",protect, allowRoles("STUDENT"), uploadResume);


export default router;