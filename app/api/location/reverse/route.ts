import { reverseGeocode } from "@/app/_lib/services/userService";
import { Address } from "@/app/_lib/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing required parameters: lat and lng" },
      { status: 400 },
    );
  }

  try {
    const address = (await reverseGeocode(Number(lat), Number(lng))) as Address;
    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.error("Reverse geocode GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
