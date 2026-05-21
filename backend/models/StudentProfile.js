import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    department: { type: String, required: true, trim: true },
    semester: { type: Number, min: 1, max: 12 },
    targetRole: { type: String, trim: true },
    targetCompanies: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true }],
    weakTopics: [{ type: String, trim: true }],
    resumeLink: String,
    resumeMeta: {
      originalName: String,
      mimeType: String,
      size: Number,
      uploadedAt: Date
    },
    githubLink: String,
    linkedinLink: String,
    readinessScore: { type: Number, default: 0, min: 0, max: 100, index: true },
    resumeScore: { type: Number, default: 0, min: 0, max: 100 },
    aiSummary: String
  },
  { timestamps: true }
);

studentProfileSchema.index({ createdAt: -1 });
studentProfileSchema.index({ department: 1, semester: 1 });

export default mongoose.model("StudentProfile", studentProfileSchema);
