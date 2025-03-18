import dotenv from "dotenv";
import path from "path";

try {
  dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });
} catch (error) {
  throw new Error("Failed to load .env file");
}

export const config = {
  PORT: process.env.ASSET_SERVICE_PORT ?? 4002,
  POSTGRES: {
    HOST: process.env.POSTGRES_ASSET_HOST,
    PORT: Number(process.env.POSTGRES_ASSET_PORT),
    USER: process.env.POSTGRES_ASSET_USER,
    PASSWORD: process.env.POSTGRES_ASSET_PASSWORD,
    DATABASE: process.env.POSTGRES_ASSET_DB
  },
  IMAGEKIT: {
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY!,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY!,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT!
  },
  RABBITMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost",
  JWT_SECRET: process.env.JWT_SECRET
};
