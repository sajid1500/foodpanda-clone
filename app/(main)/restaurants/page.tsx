import HeroBanner from "@/components/ui/HeroBanner";
import RestaurantList from "@/components/restaurants/RestaurantList";
import RestaurantListSkeleton from "@/components/restaurants/RestaurantListSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Foodie - Home",
  description: "Discover delicious meals from local restaurants.",
};

export default function Home() {
  return (
    <div className="color- px-4">
      <HeroBanner />

      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantList />
      </Suspense>
    </div>
  );
}
