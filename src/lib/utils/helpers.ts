import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(
  house: string,
  city: string,
  street: string,
): string {
  return `${house ? house + ", " : ""}${street ? street + ", " : ""}${city}`;
}
