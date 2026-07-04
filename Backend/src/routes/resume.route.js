import { getMyResume, uploadResume , extractResumeText, viewResume, viewCandidateResume, downloadCandidateResume} from "../controllers/resume.controller.js";
import {protect, allowRoles } from "../middleware/auth.middleware.js";
import express from "express"
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/me",protect,allowRoles("STUDENT"), getMyResume)

router.post(
  "/upload",
  protect,
  allowRoles("STUDENT"),
  upload.single("resume"),
  uploadResume
);

router.get("/extract", protect, allowRoles("STUDENT"), extractResumeText);

router.get(
    "/view",
    protect,
    viewResume
);

router.get(
    "/view/:studentId",
    protect,
    allowRoles("RECRUITER"),
    viewCandidateResume
);

router.get(
    "/download/:studentId",
    protect,
    allowRoles("RECRUITER"),
    downloadCandidateResume
);

export default router;