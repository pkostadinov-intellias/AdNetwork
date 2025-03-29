import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export const config = {
  PORT: process.env.POST_SERVICE_PORT ?? 4001,
  POSTGRES: {
    HOST: process.env.POSTGRES_POST_HOST,
    PORT: Number(process.env.POSTGRES_POST_PORT),
    USER: process.env.POSTGRES_POST_USER,
    PASSWORD: process.env.POSTGRES_POST_PASSWORD,
    DATABASE: process.env.POSTGRES_POST_DB
  },
  JWT_SECRET: process.env.JWT_SECRET
};
