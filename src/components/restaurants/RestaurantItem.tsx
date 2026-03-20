import React from "react";
import { RestaurantSummary } from "@/lib/types/resaurant.types";
import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";
import Link from "next/link";
import { RESTAURANT_ASSETS_URL } from "@/lib/utils/constants";
export function RestaurantItem({
  restaurant,
  index,
}: {
  restaurant: RestaurantSummary;
  index: number;
}) {
  const {
    name,
    bannerPath: banner,
    averageRating: rating,
    distanceMeters: distance,
  } = restaurant;
  const duration_eta = distance ? Math.round((distance / 1000) * 12) : null; // Assuming 12 min per km
  const delivery_fee = distance ? Math.round((distance / 1000) * 10) : null; // Assuming Tk10 per km
  return (
    <li className="border-neutral-border relative overflow-clip rounded-2xl border">
      <Image
        src={`${RESTAURANT_ASSETS_URL}/${banner}`}
        alt={name}
        width={540}
        height={270}
        className="w-full object-cover"
        loading={index < 4 ? "eager" : "lazy"}
        // preload={true}
        // TODO: loading strategy should be based on the restaurant's position in the list. For example, the first 3 restaurants can have loading="eager" and the rest can have loading="lazy"
      />
      <div className="mb-2 px-2">
        <div className="mt-2 flex justify-between">
          <h3 className="font-bold">
            <Link
              href={`/restaurant/${restaurant.slug}`}
              className="after:absolute after:inset-0"
            >
              {name}
            </Link>
          </h3>
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
        {delivery_fee && (
          <p className="flex justify-between text-sm">
            <span>🚴‍♂️ Tk{delivery_fee}</span>
            <span className="mr-1">{duration_eta} min</span>
          </p>
        )}
      </div>
    </li>
  );
}
