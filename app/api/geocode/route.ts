import {
  forwardGeocode,
  reverseGeocode,
} from "@/app/_lib/services/userService";
import { Location } from "@/app/_lib/types/api.types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const query = searchParams.get("query");
  //  for reverse geocoding
  if (lat && lng) {
    try {
      // Add your GET logic here
      const address = (await reverseGeocode(
        Number(lat),
        Number(lng),
      )) as Location;
      return NextResponse.json(address, { status: 200 });
    } catch (error) {
      console.error("GET error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
  // for forward geocoding
  if (query) {
    // Implement geocoding logic here, e.g., using an external API to convert the query into coordinates
    // For now, we will return a placeholder response
    try {
      // Add your GET logic here
      const locations = (await forwardGeocode(query)) as Location[];
      return NextResponse.json({ locations }, { status: 200 });
    } catch (error) {
      console.error("GET error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 },
      );
    }
  }
  return NextResponse.json(
    { error: "Missing required parameters" },
    { status: 400 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received POST data:", body);
    // Add your POST logic here
    return NextResponse.json(
      { message: "POST request successful", data: body },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
