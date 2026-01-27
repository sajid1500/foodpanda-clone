import React from "react";
import { Restaurant } from "@/_lib/definitions";
import Image from "next/image";
import StarRating from "./StarRating";

export default function RestaurantItem(restaurant: Restaurant) {
  const { name, image, rating } = restaurant;
  return (
    <li className="overflow-clip border border-neutral-border rounded-2xl">
      <Image src={image} alt={name} width={500} height={300} />
     <div className="mb-2 px-2">
      <div className=" flex justify-between mt-2">
        <h1 className="font-bold">{name}</h1>
        <span className="">{rating} ⭐</span>
      </div>
      <p className="text-sm flex justify-between"><span>🚴‍♂️ Tk9</span>
      <span className="mr-1">
        {restaurant.deliveryTime} min</span></p>
     </div>
      
    </li>
  );
}
