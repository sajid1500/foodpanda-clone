import { LocationDetails } from "@/lib/types/location.types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useForwardGeocode(query: string) {
  const { data, error, isLoading } = useSWR<LocationDetails[]>(
    `/api/geocode?query=${encodeURIComponent(query)}`,
    fetcher,
  );
  return { data, error, isLoading };
}
