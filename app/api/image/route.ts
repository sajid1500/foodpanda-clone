// app/api/image/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // Get the full URL from the query param
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("URL is required", { status: 400 });
  }

  try {
    // 1. Fetch the image from the direct link
    const response = await fetch(imageUrl);

    if (!response.ok) throw new Error("Failed to fetch image");

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type");

    // 2. Serve it back to your Next.js frontend
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
