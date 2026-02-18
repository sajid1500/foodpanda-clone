import { Location } from "@/app/_lib/types/api.types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useForwardGeocode(query: string) {
  const { data, error, isLoading } = useSWR<Location[]>(
    `/api/geocode?query=${encodeURIComponent(query)}`,
    fetcher,
  );
  return { data, error, isLoading };
}
