import express from "express";
import { weeklyReport, weeklyReportPdf } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/weekly", authorize("student"), weeklyReport);
router.get("/weekly/pdf", authorize("student"), weeklyReportPdf);
router.get("/weekly/:studentId", authorize("mentor", "admin"), weeklyReport);
router.get("/weekly/:studentId/pdf", authorize("mentor", "admin"), weeklyReportPdf);

export default router;
