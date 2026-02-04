import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export const errorHandler = (err: Error | HTTPException, c: Context) => {
  if (err instanceof HTTPException) {
    const cause = err.cause;
    if (cause instanceof ZodError) {
      const message = cause.issues
        .map((issue) => issue.message)
        .join(", ");

      return c.json({ message }, err.status);
    }
    return c.json({ message: err.message }, err.status);
  }

  console.error("Unhandled error:", err);

  return c.json({ message: "Something went wrong" }, 500);
};
