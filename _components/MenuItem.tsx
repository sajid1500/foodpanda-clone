import type {
  MenuItem,
  Restaurant,
  RestaurantSummary,
} from "@/_lib/definitions";
import Image from "next/image";
import Counter from "./Counter";
import MenuCounter from "./MenuCounter";

export default function MenuItem({
  restaurantSummary,
  menuItem,
}: {
  restaurantSummary: RestaurantSummary;
  menuItem: MenuItem;
}) {
  // const image = item.image ? item.image : "/placeholder.png"; // Fallback image
  // console.log("menuItem in MenuItem component:", menuItem);
  const { name, price, imagePath } = menuItem;
  const cartItem = { ...menuItem, quantity: 0 };
  return (
    <div className="border-neutral-border relative mx-4 my-4 flex items-center justify-between overflow-clip rounded-2xl border p-1">
      <div className="ml-1">
        <h1 className="font-semibold">{name}</h1>
        <span className="mt-0.5 text-red-500">${price}</span>
      </div>
      <div className="relative h-30 w-30">
        <Image
          src={imagePath ? `/assets/${imagePath}` : "/placeholder.png"}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="aspect-square rounded-md object-cover"
        />
      </div>
      <MenuCounter restaurantSummary={restaurantSummary} menuItem={menuItem} />
      {/* <AddItem restaurantSummary={restaurantSummary} item={item} /> */}
    </div>
  );
}
