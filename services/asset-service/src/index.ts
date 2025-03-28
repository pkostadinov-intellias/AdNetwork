import Koa from "koa";
import Router from "koa-router";
import { config } from "./config/config";
import { connectDatabase } from "./config/database";
import koaBody from "koa-body";
import { assetRouter } from "./asset/asset.routes";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import { extractUserMiddleware } from "./middleware/extract-user.middleware";

const app = new Koa();
const router = new Router({ prefix: "/api/v1" });

app.use(errorHandlerMiddleware);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true
    }
  })
);

app.use(extractUserMiddleware);

router.use(assetRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, async () => {
  console.log(`Asset Service is running on http://localhost:${config.PORT}`);
  await connectDatabase();
});
