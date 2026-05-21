import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    scope: { type: String, enum: ["platform", "department", "student"], default: "platform", index: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    department: { type: String, index: true },
    totalUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    averageReadiness: { type: Number, default: 0 },
    averageResumeScore: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    interviewsTaken: { type: Number, default: 0 },
    snapshotDate: { type: Date, default: Date.now, index: true },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

analyticsSchema.index({ createdAt: -1 });

export default mongoose.model("Analytics", analyticsSchema);
