import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Add your MongoDB Atlas connection string to .env.");
  }

  mongoose.set("strictQuery", true);

  const connection = await mongoose.connect(process.env.MONGO_URI);
  logger.info(`MongoDB connected: ${connection.connection.host}`);
};
