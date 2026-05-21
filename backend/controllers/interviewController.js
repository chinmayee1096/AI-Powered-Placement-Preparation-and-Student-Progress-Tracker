import MockInterview from "../models/MockInterview.js";
import StudentProfile from "../models/StudentProfile.js";
import { evaluateAnswer, generateInterviewQuestions } from "../services/aiService.js";
import { ApiError } from "../middleware/errorMiddleware.js";

export const generateQuestions = async (req, res, next) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    const result = await generateInterviewQuestions({
      type: req.body.type || "technical",
      targetRole: req.body.targetRole || profile?.targetRole,
      skills: profile?.skills,
      weakTopics: profile?.weakTopics,
      resumeText: req.body.resumeText || profile?.aiSummary
    });
    const interview = await MockInterview.create({
      studentId: req.user._id,
      type: req.body.type || "technical",
      targetRole: req.body.targetRole || profile?.targetRole,
      questions: result.questions
    });
    res.status(201).json({ success: true, data: interview, focusAreas: result.focusAreas });
  } catch (error) {
    next(error);
  }
};

export const submitAnswers = async (req, res, next) => {
  try {
    const interview = await MockInterview.findOne({ _id: req.params.id, studentId: req.user._id });
    if (!interview) throw new ApiError(404, "Interview not found");

    const evaluated = await Promise.all(
      req.body.answers.map(async (item) => {
        const evaluation = await evaluateAnswer({ question: item.question, answer: item.answer, targetRole: interview.targetRole });
        return { ...item, ...evaluation };
      })
    );

    interview.answers = evaluated;
    interview.score = Math.round(evaluated.reduce((sum, item) => sum + (item.score || 0), 0) / evaluated.length);
    interview.overallFeedback = "Review the per-question suggestions and repeat the weakest topics this week.";
    interview.status = "evaluated";
    await interview.save();

    res.json({ success: true, data: interview });
  } catch (error) {
    next(error);
  }
};

export const getInterviews = async (req, res, next) => {
  try {
    const filter = req.user.role === "student" ? { studentId: req.user._id } : {};
    const interviews = await MockInterview.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: interviews });
  } catch (error) {
    next(error);
  }
};
