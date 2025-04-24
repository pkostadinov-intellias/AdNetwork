import mongoose from "mongoose";
import { config } from "./config";

export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
