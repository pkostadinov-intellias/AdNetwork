import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { config } from './config/config'
import { connectDatabase } from './config/database'
import { connectRedis } from './config/redis'
import { connectRabbitMQ } from './config/rabbitmq'
import { authRouter } from './auth/auth.route'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'

const app = new Koa()
const router = new Router({
  prefix: '/api/v1',
})

router.get('/', async (ctx) => {
  ctx.body = { message: 'Auth Service Running 🚀' }
})

app.use(errorHandlerMiddleware)
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
router.use(authRouter.routes())

app.listen(config.PORT, async () => {
  console.log(`Auth Service is running on http://localhost:${config.PORT}`)
  await connectDatabase()
  await connectRedis()
  await connectRabbitMQ()
})
