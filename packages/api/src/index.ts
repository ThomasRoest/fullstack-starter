import "dotenv/config";
import { serve } from "@hono/node-server";
import { env_vars } from "../config.js";
import app from "./routes/index.js";

serve(
  {
    fetch: app.fetch,
    port: env_vars.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

export type AppType = typeof app;
