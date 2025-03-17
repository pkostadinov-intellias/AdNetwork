import { Context, Next } from 'koa'
import KoaProxies from 'koa-proxies'
import { SERVICES } from '../config/config'

export const createProxy =
  (route: string) => async (ctx: Context, next: Next) => {
    return KoaProxies(route, {
      target: SERVICES[route],
      changeOrigin: true,
      logs: true,
    })(ctx, next)
  }
