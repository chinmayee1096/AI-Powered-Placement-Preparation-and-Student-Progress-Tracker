import StudentProfile from "../models/StudentProfile.js";
import ProgressLog from "../models/ProgressLog.js";
import { analyzeResume } from "../services/aiService.js";
import { ApiError } from "../middleware/errorMiddleware.js";

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user._id;
    if (req.user.role === "student" && String(req.user._id) !== String(userId)) throw new ApiError(403, "Forbidden");
    const profile = await StudentProfile.findOne({ userId }).populate("userId", "name email role department");
    if (!profile) throw new ApiError(404, "Student profile not found");
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!profile) throw new ApiError(404, "Student profile not found");
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const listStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "", department, sort = "-createdAt" } = req.query;
    const userMatch = search ? { name: new RegExp(search, "i") } : {};
    const filter = department ? { department } : {};
    const profiles = await StudentProfile.find(filter)
      .populate({ path: "userId", select: "name email role department isActive", match: userMatch })
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    res.json({ success: true, data: profiles.filter((profile) => profile.userId), page: Number(page) });
  } catch (error) {
    next(error);
  }
};

export const createProgressLog = async (req, res, next) => {
  try {
    const payload = { ...req.body, studentId: req.user._id };
    payload.consistencyScore = Math.min(100, Math.round((payload.studyMinutes || 0) / 2));
    const log = await ProgressLog.create(payload);
    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const analyzeStudentResume = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (!profile) throw new ApiError(404, "Student profile not found");
    const result = await analyzeResume({
      resumeText: req.body.resumeText || profile.resumeLink || "",
      targetRole: profile.targetRole,
      skills: profile.skills
    });
    profile.resumeScore = result.score;
    profile.aiSummary = result.summary;
    profile.weakTopics = [...new Set([...(profile.weakTopics || []), ...(result.gaps || [])])].slice(0, 12);
    await profile.save();
    res.json({ success: true, data: result, profile });
  } catch (error) {
    next(error);
  }
};
