import React from "react";
import { RestaurantSummary } from "@/lib/definitions";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";

export default function RestaurantItem(restaurant: RestaurantSummary) {
  const {
    name,
    bannerPath: banner,
    averageRating: rating,
    distanceMeters: distance,
  } = restaurant;
  const duration_eta = distance ? Math.round((distance / 1000) * 12) : null; // Assuming 12 min per km
  return (
    <li className="border-neutral-border overflow-clip rounded-2xl border">
      <Link href={`/restaurant/${restaurant.shortId}`}>
        <Image src={`/assets/${banner}`} alt={name} width={500} height={300} />
        <div className="mb-2 px-2">
          <div className="mt-2 flex justify-between">
            <h1 className="font-bold">{name}</h1>
            {rating && (
              <div className="flex items-center gap-1">
                {rating}
                <StarRating
                  rating={rating}
                  maxRating={5}
                  size={18}
                  singleStar={true}
                  showRating={false}
                />
              </div>
            )}
          </div>
          <p className="flex justify-between text-sm">
            <span>🚴‍♂️ Tk9</span>
            <span className="mr-1">{duration_eta} min</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
