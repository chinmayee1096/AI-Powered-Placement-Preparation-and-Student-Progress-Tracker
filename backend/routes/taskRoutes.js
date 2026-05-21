import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { requiredFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getTasks);
router.post("/", authorize("student", "mentor"), requiredFields("title"), createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
