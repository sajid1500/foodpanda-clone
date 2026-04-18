import { HeroBanner } from "@/components/ui/HeroBanner";
import { RestaurantList } from "@/components/restaurants/RestaurantList";
import { RestaurantListSkeleton } from "@/components/restaurants/RestaurantListSkeleton";
import { Suspense } from "react";
import { AddressModal as AddressPicker } from "@/components/address/AddressModal";
import OrderSidebar from "@/components/order/OrderSidebar";

export const metadata = {
  title: "Foodie - Home",
  description: "Discover delicious meals from local restaurants.",
};

export default function Home() {
  return (
    <>
      {/* <AddressPicker /> */}
      <HeroBanner />

      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantList />
      </Suspense>
      <OrderSidebar />
    </>
  );
}
