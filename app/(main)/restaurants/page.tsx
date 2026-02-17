import HeroBanner from "@/app/_components/ui/HeroBanner";
import RestaurantList from "@/app/_components/restaurants/RestaurantList";
import RestaurantListSkeleton from "@/app/_components/restaurants/RestaurantListSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Foodie - Home",
  description: "Discover delicious meals from local restaurants.",
};

export default function Home() {
  return (
    <div className="px-4">
      <HeroBanner />

      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantList />
      </Suspense>
    </div>
  );
}
