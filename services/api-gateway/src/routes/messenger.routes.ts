import Router from 'koa-router'
import { config } from '../config/config'
import { createProxy } from '../middleware/proxy.middleware'

export const messengerRouter = new Router()

messengerRouter.all(
  [`${config.ROUTE_PATHS.MESSENGER}`, `${config.ROUTE_PATHS.MESSENGER}/*path`],
  createProxy(config.ROUTE_PATHS.MESSENGER),
)
