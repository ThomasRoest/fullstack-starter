import { db } from "./index.js";
import { posts } from "./schema.js";

const samplePosts = [
  {
    title: "Getting Started with Drizzle ORM",
    content:
      "Drizzle ORM is a lightweight and performant TypeScript ORM for SQL databases. It provides excellent type safety and a simple API for database operations.",
  },
  {
    title: "Building REST APIs with Hono",
    content:
      "Hono is a small, simple, and ultrafast web framework for the Edges. It works on any JavaScript runtime and provides a great developer experience.",
  },
  {
    title: "TypeScript Best Practices",
    content:
      "TypeScript adds static typing to JavaScript, helping catch errors early and improving code maintainability. Here are some best practices to follow when writing TypeScript code.",
  },
];



const seed = async () => {
  console.log("starting seed");

  try {
    await db.delete(posts);
    for (const post of samplePosts) {
      await db.insert(posts).values(post);
    }
    console.log("✅ Database seeded successfully!");
    console.log("\n📊 Seed Summary:");
    console.log(`- ${samplePosts.length} posts created`);
  } catch (error) {
    if (error instanceof Error) {
      console.log("seed failed", error);
    } else {
      console.log("unexpected error");
    }
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seed;
