import { ApiError } from "./errorMiddleware.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema(req.body);
  if (error) {
    return next(new ApiError(400, "Validation failed", error));
  }
  req.body = value;
  next();
};

export const requiredFields = (...fields) => (req, res, next) => {
  const missing = fields.filter((field) => req.body[field] === undefined || req.body[field] === "");
  if (missing.length) return next(new ApiError(400, `Missing required fields: ${missing.join(", ")}`));
  next();
};
