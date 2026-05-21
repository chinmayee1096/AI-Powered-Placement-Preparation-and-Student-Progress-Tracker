import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { requiredFields } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", authLimiter, requiredFields("name", "email", "password"), register);
router.post("/login", authLimiter, requiredFields("email", "password"), login);
router.get("/me", protect, me);

export default router;
