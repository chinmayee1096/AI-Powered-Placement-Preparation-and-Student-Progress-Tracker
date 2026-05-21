import express from "express";
import { platformAnalytics, studentAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/student", authorize("student"), studentAnalytics);
router.get("/student/:studentId", authorize("mentor", "admin"), studentAnalytics);
router.get("/platform", authorize("admin"), platformAnalytics);

export default router;
