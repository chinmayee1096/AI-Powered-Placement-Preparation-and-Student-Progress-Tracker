import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: String, enum: ["progress", "interview", "resume", "task", "general"], default: "general" },
    rating: { type: Number, min: 1, max: 5 },
    status: { type: String, enum: ["open", "acknowledged"], default: "open", index: true }
  },
  { timestamps: true }
);

feedbackSchema.index({ createdAt: -1 });

export default mongoose.model("Feedback", feedbackSchema);
