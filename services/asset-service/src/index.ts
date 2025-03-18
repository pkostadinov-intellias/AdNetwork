import Koa from "koa";
import Router from "koa-router";
import { config } from "./config/config";
import { connectDatabase } from "./config/database";

const app = new Koa();
const router = new Router({ prefix: "/api/v1" });

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, async () => {
  console.log(`Asset Service is running on http://localhost:${config.PORT}`);
  await connectDatabase();
});
