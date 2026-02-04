import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from '@hono/node-server/serve-static'
import posts from "./posts.js";
import { errorHandler } from "../lib/error-handler.js";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono()
  .use("/*", serveStatic({ root: '../web/dist' })).basePath("/api")
  .use(logger())
  .use(secureHeaders())
  .route("/posts", posts)
  .onError(errorHandler);

export default app;
