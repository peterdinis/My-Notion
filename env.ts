import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    EDGE_STORE_ACCESS_KEY: z.string().min(1),
    EDGE_STORE_SECRET_KEY: z.string().min(1),
  },
 
  clientPrefix: "NEXT_PUBLIC_",
 
  client: {
    NEXT_PUBLIC_CONVEX_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),
  },
 
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});