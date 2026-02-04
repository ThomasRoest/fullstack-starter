import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { idParamSchema, posts, postsInsertSchema, postsUpdateSchema } from "../db/schema.js";
import { validator } from "../lib/validator.js";

const app = new Hono()
  .get("/", async (c) => {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return c.json(allPosts);
  })
  .post("/", validator("json", postsInsertSchema), async (c) => {
    const body = c.req.valid("json");
    await db.insert(posts).values(body).returning();
    return c.json({ message: "post created" }, 201);
  })
  .get("/:id", validator("param", idParamSchema), async (c) => {
    const id = c.req.valid("param").id;
    const post = await db.select().from(posts).where(eq(posts.id, id));
    if (!post[0]) {
      throw new HTTPException(404, { message: "Post not found" });
    }
    return c.json(post[0]);
  })
  .put("/:id", validator("param", idParamSchema), validator("json", postsUpdateSchema), async (c) => {
    const id = c.req.valid("param").id;
    const body = c.req.valid("json");
    const updated = await db.update(posts).set(body).where(eq(posts.id, id)).returning();
    if (!updated[0]) {
      throw new HTTPException(404, { message: "Post not found" });
    }
    return c.json({ message: "post updated"});
  })
  .delete("/:id", validator("param", idParamSchema), async (c) => {
    const id = c.req.valid("param").id;
    const deleted = await db.delete(posts).where(eq(posts.id, id)).returning();
    if (!deleted[0]) {
      throw new HTTPException(404, { message: "Post not found" });
    }
    return c.json({ message: "Post deleted" });
  });
export default app;
