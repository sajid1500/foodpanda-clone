import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/app/_lib/supabase/proxy";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 1. Initialize Redis and Ratelimit
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // 5 requests per 60 seconds
});

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/restaurants", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/api")) {
    // 2. Check for a specific header or Origin
    const origin = request.headers.get("origin");
    const allowedOrigin = "*.app.github.dev"; // Change for production

    if (origin && origin !== allowedOrigin) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      });
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/geocode")) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1"; // Get user IP
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
