import * as schema from "./schema.js"
import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env_vars } from "../../config.js";

const pool = new Pool({
  connectionString: env_vars.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
