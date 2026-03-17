import { Address } from "@/lib/types/user.types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useForwardGeocode(query: string) {
  const { data, error, isLoading } = useSWR<Address[]>(
    `/api/geocode?query=${encodeURIComponent(query)}`,
    fetcher,
  );
  return { data, error, isLoading };
}
