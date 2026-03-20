import { getAutocomplete } from "@/lib/services/geocodeService";
import { Address } from "@/lib/validators/address.schema";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || query.length < 3) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  try {
    // Add your GET logic here
    const locations = (await getAutocomplete(query)) as Address[];
    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
