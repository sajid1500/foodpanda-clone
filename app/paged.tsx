import HeroBanner from "@/_components/HeroBanner";
import RestaurantList from "@/_components/RestaurantList";

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
