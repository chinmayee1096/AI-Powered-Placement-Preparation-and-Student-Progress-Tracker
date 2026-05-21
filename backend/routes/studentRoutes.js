import express from "express";
import {
  analyzeStudentResume,
  createProgressLog,
  getProfile,
  listStudents,
  updateProfile
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.use(protect);
router.get("/", authorize("mentor", "admin"), listStudents);
router.get("/profile", authorize("student"), getProfile);
router.get("/:userId/profile", authorize("mentor", "admin"), getProfile);
router.put("/profile", authorize("student"), updateProfile);
router.post("/progress", authorize("student"), createProgressLog);
router.post("/resume/analyze", authorize("student"), aiLimiter, analyzeStudentResume);

export default router;
