import PDFDocument from "pdfkit";
import Feedback from "../models/Feedback.js";
import { getStudentAnalytics } from "./analyticsService.js";

export const buildWeeklyReport = async (studentId) => {
  const analytics = await getStudentAnalytics(studentId);
  const feedback = await Feedback.find({ studentId }).sort({ createdAt: -1 }).limit(5).populate("mentorId", "name email");

  return {
    generatedAt: new Date(),
    analytics,
    mentorNotes: feedback,
    summary: `Readiness ${analytics.readinessScore}%, task completion ${analytics.taskCompletion}%, average interview score ${analytics.averageInterviewScore}%.`
  };
};

export const streamReportPdf = async (report, res) => {
  const doc = new PDFDocument({ margin: 48 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=weekly-placement-report.pdf");
  doc.pipe(res);
  doc.fontSize(18).text("Weekly Placement Preparation Report");
  doc.moveDown();
  doc.fontSize(11).text(`Generated: ${report.generatedAt.toDateString()}`);
  doc.moveDown();
  doc.text(report.summary);
  doc.moveDown();
  doc.text(`Weak Topics: ${(report.analytics.weakTopics || []).join(", ") || "None recorded"}`);
  doc.text(`Completed Tasks: ${report.analytics.completedTasks}/${report.analytics.totalTasks}`);
  doc.text(`Resume Score: ${report.analytics.resumeScore}`);
  doc.end();
};
