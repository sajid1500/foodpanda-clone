import { z } from "zod";

const sharedSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_URL: z.url(),
  NEXT_PUBLIC_MAPS_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
});

const serverSchema = z.object({
  DATABASE_URL: z.url().optional(),
  FOODPANDA_PRIVATE_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  SUPABASE_ACCESS_TOKEN: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  LOCATIONIQ_API_KEY: z.string().min(1),
});

type SharedEnv = z.infer<typeof sharedSchema>;
type ClientEnv = z.infer<typeof clientSchema>;
type ServerEnv = z.infer<typeof serverSchema>;

const runtimeEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  FOODPANDA_PRIVATE_KEY: process.env.FOODPANDA_PRIVATE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  LOCATIONIQ_API_KEY: process.env.LOCATIONIQ_API_KEY,
};

const parsedShared = sharedSchema.safeParse(runtimeEnv);
const parsedClient = clientSchema.safeParse(runtimeEnv);

if (!parsedShared.success || !parsedClient.success) {
  const formatted = {
    ...(parsedShared.success ? {} : parsedShared.error.format()),
    ...(parsedClient.success ? {} : parsedClient.error.format()),
  };
  console.error("Invalid public environment variables", formatted);
  throw new Error("Invalid public environment variables");
}

const isServer = typeof window === "undefined";
const parsedServer = isServer ? serverSchema.safeParse(runtimeEnv) : null;

if (isServer && parsedServer && !parsedServer.success) {
  console.error(
    "Invalid server environment variables",
    parsedServer.error.format(),
  );
  throw new Error("Invalid server environment variables");
}

const mergedEnv = {
  ...parsedShared.data,
  ...parsedClient.data,
  ...(isServer && parsedServer && parsedServer.success
    ? parsedServer.data
    : {}),
} as SharedEnv & ClientEnv & ServerEnv;

const clientAllowedKeys = new Set([
  ...Object.keys(parsedShared.data),
  ...Object.keys(parsedClient.data),
]);

export const env = new Proxy(mergedEnv, {
  get(target, prop) {
    if (typeof prop !== "string") {
      return Reflect.get(target, prop);
    }

    if (!isServer && !clientAllowedKeys.has(prop)) {
      throw new Error(
        `Attempted to access server env var "${prop}" from the client.`,
      );
    }

    return Reflect.get(target, prop);
  },
});
