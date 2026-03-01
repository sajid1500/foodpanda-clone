import Image from "next/image";
import React from "react";
import heroImage from "@/public/refresh-hero-city-bd.png";
export default function HeroBanner() {
  return (
    <div className="flex items-center gap-6 rounded-md bg-gray-100">
      <h1 className="ml-4 text-[18px] font-semibold">
        Food Delivery from Dhaka’s Best Restaurants
      </h1>
      <div className="relative aspect-video h-[148px] w-[187px] rounded-md">
        <Image
          fill
          sizes="(max-width: 768px) 148px, 187px"
          className="object-cover"
          src={heroImage}
          z-index={99999}
          placeholder="blur"
          // loading="eager"
          preload
          quality={75}
          alt="Hero Banner"
        />
      </div>
    </div>
  );
}
