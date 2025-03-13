import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import { proxyMiddleware } from './proxy'
import { config } from './config'

const app = new Koa()
const router = new Router({ prefix: '/api/v1' })

// Use Proxy Middleware
router.use(proxyMiddleware)

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${config.PORT}`)
})
