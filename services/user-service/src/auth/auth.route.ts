import Router from 'koa-router'
import { login, register } from './auth.cotroller'
import { validatorMiddleware } from '../middlewares/validator.middleware'
import { loginSchema, registerSchema } from './auth-validation.schemas'

export const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/register', validatorMiddleware(registerSchema), register)
authRouter.post('/login', validatorMiddleware(loginSchema), login)
