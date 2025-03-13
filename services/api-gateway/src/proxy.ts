import { Context, Next } from 'koa'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { SERVICES } from './config'

export const proxyMiddleware = async (ctx: Context, next: Next) => {
  const path = ctx.path

  const target = Object.keys(SERVICES).find((prefix) => path.startsWith(prefix))

  if (target && SERVICES[target]) {
    ctx.respond = false

    return createProxyMiddleware({
      target: SERVICES[target],
      changeOrigin: true,
      pathRewrite: (path) => path.replace(target, ''),
    })(ctx.req, ctx.res, next)
  }

  await next()
}
