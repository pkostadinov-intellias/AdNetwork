import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import { createProxy } from './middleware/proxy.middleware'
import { connectRedis } from './config/redis'
import { verifyToken } from './middleware/auth.middleware'
import { config } from './config/config'

const app = new Koa()
const router = new Router()

app.use(cors())

// Auth routes (No token verification required)
router.all(
  `${config.ROUTE_PATHS.AUTH}/*path`,
  createProxy(config.ROUTE_PATHS.AUTH),
)

router.use(verifyToken)

router.all(
  [`${config.ROUTE_PATHS.USERS}`, `${config.ROUTE_PATHS.USERS}/*path`],
  createProxy(config.ROUTE_PATHS.USERS),
)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.PORT, async () => {
  console.log(`API Gateway running on port ${config.PORT}`)
  await connectRedis()
})
