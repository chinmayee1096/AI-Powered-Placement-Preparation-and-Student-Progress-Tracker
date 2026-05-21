import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import MockInterview from "../models/MockInterview.js";
import ProgressLog from "../models/ProgressLog.js";
import StudentProfile from "../models/StudentProfile.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { logger } from "./logger.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  const demoUsers = await User.find({ email: /@demo.edu$/ }).select("_id");
  const demoIds = demoUsers.map((user) => user._id);
  await Promise.all([
    User.deleteMany({ email: /@demo.edu$/ }),
    StudentProfile.deleteMany({ userId: { $in: demoIds } }),
    Task.deleteMany({ studentId: { $in: demoIds } }),
    ProgressLog.deleteMany({ studentId: { $in: demoIds } }),
    MockInterview.deleteMany({ studentId: { $in: demoIds } })
  ]);

  const admin = await User.create({ name: "Admin Demo", email: "admin@demo.edu", password: "Password123", role: "admin" });
  const mentor = await User.create({ name: "Mentor Demo", email: "mentor@demo.edu", password: "Password123", role: "mentor" });
  const student = await User.create({
    name: "Aarav Student",
    email: "student@demo.edu",
    password: "Password123",
    role: "student",
    department: "Computer Science"
  });

  await StudentProfile.create({
    userId: student._id,
    mentorId: mentor._id,
    department: "Computer Science",
    semester: 7,
    targetRole: "MERN Stack Developer",
    targetCompanies: ["TCS", "Infosys", "Zoho", "Accenture"],
    skills: ["React", "Node.js", "MongoDB", "DSA"],
    weakTopics: ["System design", "Dynamic programming"],
    resumeLink: "https://example.com/resume.pdf",
    githubLink: "https://github.com/demo-student",
    linkedinLink: "https://linkedin.com/in/demo-student",
    readinessScore: 74,
    resumeScore: 69
  });

  await Task.insertMany([
    { studentId: student._id, createdBy: student._id, title: "Solve 5 array problems", category: "coding", priority: "high", status: "in-progress", deadline: new Date(Date.now() + 86400000) },
    { studentId: student._id, createdBy: mentor._id, title: "Rewrite resume project bullets", category: "resume", priority: "medium", status: "pending", deadline: new Date(Date.now() + 172800000) },
    { studentId: student._id, createdBy: student._id, title: "Practice HR introduction", category: "hr", priority: "medium", status: "completed", completedAt: new Date() }
  ]);

  await ProgressLog.insertMany([
    { studentId: student._id, studyMinutes: 90, topicsCompleted: ["Arrays"], consistencyScore: 70, readinessScore: 72 },
    { studentId: student._id, studyMinutes: 130, topicsCompleted: ["DBMS indexes"], consistencyScore: 85, readinessScore: 74 }
  ]);

  await MockInterview.create({
    studentId: student._id,
    type: "technical",
    targetRole: "MERN Stack Developer",
    questions: ["Explain React reconciliation.", "How do MongoDB indexes improve query speed?"],
    score: 78,
    status: "evaluated"
  });

  logger.info(`Seeded demo accounts: ${admin.email}, ${mentor.email}, ${student.email}`);
  await mongoose.disconnect();
};

seed().catch((error) => {
  logger.error("Seed failed", error);
  process.exit(1);
});
