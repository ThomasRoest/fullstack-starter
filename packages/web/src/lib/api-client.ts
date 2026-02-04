import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index.js";

export const queryKeys = {
  POSTS: "posts",
} as const;

const apiClient = hc<AppType>("/");
export const { api } = apiClient;