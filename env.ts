// import { z } from "zod";

// const serverSchema = z.object({
//   DATABASE_URL: z.string().url(),
//   FOODPANDA_PRIVATE_KEY: z.string().min(1),
//   NODE_ENV: z.enum(["development", "test", "production"]),
// });

// const clientSchema = z.object({
//   NEXT_PUBLIC_MAPS_API_KEY: z.string().min(1),
//   NEXT_PUBLIC_BASE_URL: z.string().url(),
// });

// // Logic to validate both
// const processEnv = {
//   DATABASE_URL: process.env.DATABASE_URL,
//   FOODPANDA_PRIVATE_KEY: process.env.FOODPANDA_PRIVATE_KEY,
//   NODE_ENV: process.env.NODE_ENV,
//   NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
//   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
// };

// // 1. Validate everything
// const mergedSchema = serverSchema.extend(clientSchema.shape);
// const parsed = mergedSchema.safeParse(processEnv);

// if (!parsed.success) {
//   console.error("❌ Invalid environment variables:", parsed.error.format());
//   throw new Error("Invalid environment variables");
// }

// // 2. Export with a "Guard"
// export const env = parsed.data;

// // Add this check at the bottom of your env.ts
// if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_DATA) {
//   // Logic to prevent server keys from being bundled
// }
