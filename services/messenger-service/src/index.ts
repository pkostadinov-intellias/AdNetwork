import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { errorHandlerMiddleware } from "./middleware/error-handler.middleware";
import { config } from "./config/config";
import { connectMongoDB } from "./config/mongodb";
import http from "http";
import { initSocketServer } from "./socket";
import { extractUserMiddleware } from "./middleware/extract-user.middleware";
import { messagesRouter } from "./messages/messages.routes";

const app = new Koa();
const router = new Router({
  prefix: "/api/v1"
});

app.use(errorHandlerMiddleware);

app.use(bodyParser());

app.use(extractUserMiddleware);

router.use(messagesRouter.routes());

app.use(router.routes()).use(router.allowedMethods());

const httpServer = http.createServer(app.callback());

const startServer = async () => {
  try {
    await connectMongoDB();
    initSocketServer(httpServer);
    httpServer.listen(config.PORT, () => {
      console.log(
        `Messenger Service is running on http://localhost:${config.PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
