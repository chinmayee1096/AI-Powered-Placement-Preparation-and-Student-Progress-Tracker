import { buildWeeklyReport, streamReportPdf } from "../services/reportService.js";

export const weeklyReport = async (req, res, next) => {
  try {
    const report = await buildWeeklyReport(req.params.studentId || req.user._id);
    res.json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};

export const weeklyReportPdf = async (req, res, next) => {
  try {
    const report = await buildWeeklyReport(req.params.studentId || req.user._id);
    await streamReportPdf(report, res);
  } catch (error) {
    next(error);
  }
};
