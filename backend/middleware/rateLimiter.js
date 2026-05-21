import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { success: false, message: "Too many authentication attempts. Try again later." }
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  message: { success: false, message: "AI request limit reached. Please wait a minute." }
});
