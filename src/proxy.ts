import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/config/supabase/proxy";
import ratelimit from "@/lib/config/redis";

export async function proxy(request: NextRequest) {
  console.log("Redirecting to /restaurants", request.nextUrl.pathname);
  // Redirect root path to /restaurants
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/restaurants", request.url));
  }
  // Rate limit geocoding API requests
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
