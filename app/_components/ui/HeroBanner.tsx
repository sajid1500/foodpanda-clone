import Image from "next/image";
import React from "react";
import heroImage from "@/public/refresh-hero-city-bd.png";
export default function HeroBanner() {
  return (
    <div className="flex gap-6 items-center bg-gray-100  rounded-md">
      <h1 className="ml-4 text-[18px] font-semibold">
        Food Delivery from Dhaka’s Best Restaurants
      </h1>
      <div className="w-[187px] h-[148px] min-w-[148px] max-w-[2560px] bg-cover relative aspect-video ">
        <Image fill className="object-left object-cover " src={heroImage} alt="Hero Banner" />
      </div>
    </div>
  );
}
