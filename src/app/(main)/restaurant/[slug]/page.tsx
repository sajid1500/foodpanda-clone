import React from "react";
import { getRestaurantDetails } from "@/lib/services/restaurantService";
import { MenuItem } from "@/components/restaurants/MenuItem";
import Image from "next/image";
import { RESTAURANT_ASSETS_URL } from "@/lib/utils/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurantDetails = await getRestaurantDetails(slug);
  const restaurantName = restaurantDetails.name;
  return {
    title: `${restaurantName}`,
    description: `Details and menu for ${restaurantName}`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurantDetails = await getRestaurantDetails(slug);
  const { name, logoPath, bannerPath, menu } = restaurantDetails;
  const imagePath = logoPath ?? bannerPath;
  const restaurantSummary = {
    id: restaurantDetails.id,
    slug: restaurantDetails.slug,
    name: restaurantDetails.name,
    logoPath: logoPath,
    bannerPath: bannerPath,
    averageRating: restaurantDetails.averageRating,
  };
  // console.log("imagePath", imagePath);
  // console.log("slug", slug);
  // console.log("restaurant details", restaurantDetails);
  return (
    <>
      <section className="flex items-center gap-4 rounded-lg p-4 shadow-md">
        <div className="relative h-22.5 w-22.5">
          <Image
            src={
              imagePath
                ? `${RESTAURANT_ASSETS_URL}/${imagePath}`
                : "/placeholder.png"
            }
            alt={name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="aspect-square rounded-md object-cover"
          />
        </div>

        <h1 className="font-inter text-xl font-bold">{name}</h1>
      </section>
      <section className="mt-6">
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <MenuItem restaurantSummary={restaurantSummary} menuItem={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
