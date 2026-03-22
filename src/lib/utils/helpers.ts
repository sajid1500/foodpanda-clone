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
  const parts = [house, street, city].filter(Boolean);
  return parts.join(", ");
}

export function formatUserAddress(addressLine1: string, city: string): string {
  const parts = [addressLine1, city].filter(Boolean);
  return parts.join(" ");
}

export const emptyToNull = (val: unknown) => (val === "" ? null : val);
