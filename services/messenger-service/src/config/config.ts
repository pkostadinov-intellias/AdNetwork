import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in your environment variables.");
}

export const config = {
  PORT: process.env.MESSENGER_SERVICE_PORT ?? 4004,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET
};
