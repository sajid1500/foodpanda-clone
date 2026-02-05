import React from "react";
import { Restaurant } from "@/_lib/definitions";
import Image from "next/image";
import StarRating from "./StarRating";
import Link from "next/link";

export default function RestaurantItem(restaurant: Restaurant) {
  const { name, image: banner, rating } = restaurant;
  return (
    <li className="border-neutral-border overflow-clip rounded-2xl border">
      <Link href={`/restaurant/${restaurant.id}`}>
        <Image
          src={`/api/image?url=${encodeURIComponent(banner)}`}
          alt={name}
          width={500}
          height={300}
        />
        <div className="mb-2 px-2">
          <div className="mt-2 flex justify-between">
            <h1 className="font-bold">{name}</h1>
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
          </div>
          <p className="flex justify-between text-sm">
            <span>🚴‍♂️ Tk9</span>
            <span className="mr-1">{restaurant.deliveryTime} min</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
