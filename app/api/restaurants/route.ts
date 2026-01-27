import { Restaurant } from "@/_lib/definitions";
import { NextResponse } from "next/server";
// import { getRestaurants } from "@/_lib/dataService";

export async function getRestaurants() {
  const restaurantsResponse = await fetch(
    `${process.env.LOCAL_API_URL}/restaurants`
  );
  const restaurants = await restaurantsResponse.json();
  return restaurants;
}
