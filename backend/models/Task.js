import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, enum: ["aptitude", "coding", "technical", "hr", "resume", "project", "other"], default: "other" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    status: { type: String, enum: ["pending", "in-progress", "completed", "overdue"], default: "pending", index: true },
    deadline: { type: Date, index: true },
    reminderAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);

taskSchema.index({ createdAt: -1 });
taskSchema.index({ studentId: 1, status: 1 });

export default mongoose.model("Task", taskSchema);
