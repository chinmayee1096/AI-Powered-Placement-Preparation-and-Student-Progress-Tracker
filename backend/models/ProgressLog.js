import mongoose from "mongoose";

const progressLogSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    date: { type: Date, default: Date.now, index: true },
    studyMinutes: { type: Number, default: 0 },
    topicsCompleted: [{ type: String, trim: true }],
    notes: String,
    consistencyScore: { type: Number, min: 0, max: 100, default: 0 },
    mockInterviewScore: { type: Number, min: 0, max: 100 },
    resumeScore: { type: Number, min: 0, max: 100 },
    readinessScore: { type: Number, min: 0, max: 100 }
  },
  { timestamps: true }
);

progressLogSchema.index({ createdAt: -1 });
progressLogSchema.index({ studentId: 1, date: -1 });

export default mongoose.model("ProgressLog", progressLogSchema);
