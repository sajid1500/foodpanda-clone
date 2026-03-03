import { getAutocomplete } from "@/app/_lib/services/userService";
import { Address } from "@/app/_lib/types/api.types";

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
    const addresses = (await getAutocomplete(query)) as Address[];
    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
