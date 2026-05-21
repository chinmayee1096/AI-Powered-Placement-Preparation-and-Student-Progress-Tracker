import MockInterview from "../models/MockInterview.js";
import ProgressLog from "../models/ProgressLog.js";
import StudentProfile from "../models/StudentProfile.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getStudentAnalytics = async (studentId) => {
  const [profile, tasks, logs, interviews] = await Promise.all([
    StudentProfile.findOne({ userId: studentId }),
    Task.find({ studentId }).sort({ createdAt: -1 }).limit(50),
    ProgressLog.find({ studentId }).sort({ date: -1 }).limit(14),
    MockInterview.find({ studentId }).sort({ createdAt: -1 }).limit(10)
  ]);

  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const taskCompletion = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const averageInterviewScore = interviews.length
    ? Math.round(interviews.reduce((sum, item) => sum + (item.score || 0), 0) / interviews.length)
    : 0;

  return {
    profile,
    readinessScore: profile?.readinessScore || 0,
    resumeScore: profile?.resumeScore || 0,
    taskCompletion,
    completedTasks,
    totalTasks: tasks.length,
    averageInterviewScore,
    consistency: logs.map((log) => ({
      date: log.date,
      studyMinutes: log.studyMinutes,
      score: log.consistencyScore
    })).reverse(),
    weakTopics: profile?.weakTopics || [],
    recentInterviews: interviews
  };
};

export const getPlatformAnalytics = async () => {
  const [totalUsers, activeUsers, students, tasks, interviews] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    StudentProfile.find(),
    Task.find(),
    MockInterview.find()
  ]);

  const average = (items, field) =>
    items.length ? Math.round(items.reduce((sum, item) => sum + (item[field] || 0), 0) / items.length) : 0;

  return {
    totalUsers,
    activeUsers,
    totalStudents: students.length,
    averageReadiness: average(students, "readinessScore"),
    averageResumeScore: average(students, "resumeScore"),
    completedTasks: tasks.filter((task) => task.status === "completed").length,
    interviewsTaken: interviews.length
  };
};
