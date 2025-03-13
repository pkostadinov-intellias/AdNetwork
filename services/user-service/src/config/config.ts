import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

export const config = {
  PORT: process.env.USER_SERVICE_PORT ?? 4000,
  POSTGRES: {
    HOST: process.env.POSTGRES_USER_HOST,
    PORT: Number(process.env.POSTGRES_USER_PORT),
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_USER_PASSWORD,
    DATABASE: process.env.POSTGRES_USER_DB,
  },
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
  JWT_SECRET: process.env.USER_SERVICE_JWT_SECRET,
}
