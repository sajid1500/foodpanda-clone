import HeroBanner from "@/app/_components/ui/HeroBanner";
import RestaurantList from "@/app/_components/restaurants/RestaurantList";

export const metadata = {
  title: "Foodie - Home",
  description: "Discover delicious meals from local restaurants.",
};

export default function Home() {
  return (
    <div className="px-4">
      <HeroBanner />

      <RestaurantList />
    </div>
  );
}
