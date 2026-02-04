import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string('eg: DATABASE_URL=db_url').min(1),
  FRONTEND_APP_URL: z.string('eg: FRONTEND_APP_URL=frontend_url').min(1),
  PORT: z.coerce.number().default(3000),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("\n❌ Missing or invalid environment variables:\n");
    console.error(
      result.error.issues.map((i) => `  - ${i.path}: ${i.message}`).join("\n")
    );
    process.exit(1);
  }
  return result.data;
};

export const env_vars = parseEnv();
