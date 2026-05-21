import { getPlatformAnalytics, getStudentAnalytics } from "../services/analyticsService.js";

export const studentAnalytics = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.user._id;
    const data = await getStudentAnalytics(studentId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const platformAnalytics = async (req, res, next) => {
  try {
    const data = await getPlatformAnalytics();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
