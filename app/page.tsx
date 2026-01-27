import HeroBanner from "@/_components/HeroBanner";
import ResturantList from "@/_components/ResturantList";
import Image from "next/image";

export const metadata = {
  title: "Foodie - Home",
  description: "Discover delicious meals from local restaurants.",
};

export default function Home() {
  return (
    <div className="px-4">
      <HeroBanner />

      <ResturantList />
    </div>
  );
}
