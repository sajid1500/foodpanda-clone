import { reverseGeocode } from "@/lib/services/geocodeService";
import { Address } from "@/lib/validators/address.schema";
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
    const location = (await reverseGeocode(
      Number(lat),
      Number(lng),
    )) as Address;
    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    console.error("Reverse geocode GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
