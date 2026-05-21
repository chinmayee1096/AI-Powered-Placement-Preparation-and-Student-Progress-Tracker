import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["reminder", "interview", "progress", "feedback", "system"], default: "system" },
    status: { type: String, enum: ["unread", "read"], default: "unread", index: true },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ userId: 1, status: 1 });

export default mongoose.model("Notification", notificationSchema);
