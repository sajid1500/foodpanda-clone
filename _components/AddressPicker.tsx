import { getLocationName, getUser } from "@/lib/data-service";

export default async function LocationPicker() {
  const locationName = await getLocationName(lat, lng);
  return <div>{locationName}</div>;
}
