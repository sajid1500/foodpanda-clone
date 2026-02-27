import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/app/_lib/config/supabase/proxy";
import ratelimit from "@/app/_lib/config/redis";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/restaurants", request.url));
  }
  // cors check for API routes
  // if (request.nextUrl.pathname.startsWith("/api")) {
  //   // 2. Check for a specific header or Origin
  //   const origin = request.headers.get("origin");
  //   const allowedOrigin = "*.app.github.dev"; // Change for production

  //   if (origin && origin !== allowedOrigin) {
  //     return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
  //       status: 403,
  //       headers: { "content-type": "application/json" },
  //     });
  //   }
  // }
  // Rate limit geocoding API to prevent abuse
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
