import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiError } from "../middleware/errorMiddleware.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "student", department, semester } = req.body;
    if (role === "admin") throw new ApiError(403, "Admin accounts must be created by a system administrator");
    const exists = await User.findOne({ email });
    if (exists) throw new ApiError(409, "Email is already registered");

    const user = await User.create({ name, email, password, role, department });
    if (role === "student") {
      await StudentProfile.create({ userId: user._id, department: department || "Not specified", semester });
    }

    res.status(201).json({ success: true, token: generateToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) throw new ApiError(401, "Invalid credentials");

    user.lastLoginAt = new Date();
    await user.save();
    res.json({ success: true, token: generateToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
};
