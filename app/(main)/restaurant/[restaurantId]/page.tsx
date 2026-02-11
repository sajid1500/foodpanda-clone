import React from "react";
import { getRestaurantDetails } from "@/lib/data-service";
import MenuItem from "@/_components/MenuItem";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ restaurantId: string; restaurantName: string }>;
}) {
  const { restaurantId } = await params;
  const restaurantDetails = await getRestaurantDetails(restaurantId);
  const restaurantName = restaurantDetails.name;
  return {
    title: `${restaurantName}`,
    description: `Details and menu for ${restaurantName}`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ restaurantId: string; restaurantName: string }>;
}) {
  const { restaurantId } = await params;
  const restaurantDetails = await getRestaurantDetails(restaurantId);
  const { name, logoPath, bannerPath, menu } = restaurantDetails;
  const imagePath = logoPath ?? bannerPath;
  const restaurantSummary = {
    id: restaurantDetails.id,
    shortId: restaurantDetails.shortId,
    name: restaurantDetails.name,
    logoPath: logoPath,
    bannerPath: bannerPath,
    averageRating: restaurantDetails.averageRating,
  };
  // console.log("imagePath", imagePath);
  // console.log("restaurantId", restaurantId);
  // console.log("restaurant details", restaurantDetails);
  return (
    <div>
      <section className="mt-6 flex items-center gap-4 rounded-lg p-4 shadow-md">
        <div className="relative h-22.5 w-22.5">
          <Image
            src={imagePath ? `/assets/${imagePath}` : "/placeholder.png"}
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
    </div>
  );
}
