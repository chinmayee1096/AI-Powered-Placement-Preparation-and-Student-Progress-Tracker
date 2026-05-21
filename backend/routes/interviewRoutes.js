import express from "express";
import { generateQuestions, getInterviews, submitAnswers } from "../controllers/interviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.use(protect);
router.get("/", getInterviews);
router.post("/generate", authorize("student"), aiLimiter, generateQuestions);
router.post("/:id/submit", authorize("student"), aiLimiter, submitAnswers);

export default router;
