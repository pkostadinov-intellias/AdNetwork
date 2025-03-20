import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import { connectRedis } from './config/redis'
import { verifyToken } from './middleware/auth.middleware'
import { config } from './config/config'
import { authRouter } from './routes/auth.routes'
import { userRouter } from './routes/user.routes'
import { assetRouter } from './routes/asset.routes'

const app = new Koa()
const router = new Router()

app.use(cors())

// Public Auth Routes (no token verification)
router.use(authRouter.routes())

router.use(verifyToken)

router.use(userRouter.routes())
router.use(assetRouter.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.PORT, async () => {
  console.log(`API Gateway running on port ${config.PORT}`)
  await connectRedis()
})
