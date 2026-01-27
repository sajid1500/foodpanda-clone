import type { MenuItem } from "@/_lib/definitions";
import Image from "next/image";
import React from "react";
import AddItem from "./AddItem";

export default function MenuItem({
  restaurantId,
  item,
}: {
  restaurantId: string;
  item: MenuItem;
}) {
  const image = item.image ? item.image : "/placeholder.png"; // Fallback image

  return (
    <div className="border-neutral-border relative mx-4 my-4 flex items-center justify-between overflow-clip rounded-2xl border p-1">
      <div className="ml-1">
        <h1 className="font-semibold">{item.name}</h1>
        <span className="mt-0.5 text-red-500">${item.price}</span>
      </div>
      <div className="relative h-22.5 w-22.5">
        <Image
          src={image}
          alt={item.name}
          fill
          className="aspect-square rounded-md object-cover"
        />
      </div>
      <AddItem restaurantId={restaurantId} item={item} />
    </div>
  );
}
