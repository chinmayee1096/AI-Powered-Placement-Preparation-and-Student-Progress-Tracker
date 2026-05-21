import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: String,
    feedback: String,
    score: { type: Number, min: 0, max: 100 },
    suggestions: [String]
  },
  { _id: false }
);

const mockInterviewSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["technical", "aptitude", "coding", "hr", "resume"], required: true, index: true },
    targetRole: String,
    questions: [String],
    answers: [answerSchema],
    overallFeedback: String,
    score: { type: Number, default: 0, min: 0, max: 100 },
    status: { type: String, enum: ["generated", "submitted", "evaluated"], default: "generated", index: true }
  },
  { timestamps: true }
);

mockInterviewSchema.index({ createdAt: -1 });
mockInterviewSchema.index({ studentId: 1, createdAt: -1 });

export default mongoose.model("MockInterview", mockInterviewSchema);
