import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

export const config = {
  PORT: Number(process.env.API_GATEWAY_PORT),
}

export const SERVICES: Record<string, string> = {
  '/api/v1/auth': process.env.USER_SERVICE_URL || 'http://localhost:4000',
  '/api/v1/users': process.env.USER_SERVICE_URL || 'http://localhost:4000',
  //   '/api/v1/posts': process.env.POSTS_SERVICE_URL || 'http://localhost:5000',
  //   '/api/v1/messages':
  //     process.env.MESSENGER_SERVICE_URL || 'http://localhost:6000',
}
