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

const ZERO_DECIMAL_CURRENCIES = ["JPY", "KRW", "CLP", "VND", "PYG", "UGX"];

export function formatStripeAmount(amount: number, currency: string) {
  const code = currency.toUpperCase();

  if (ZERO_DECIMAL_CURRENCIES.includes(code)) {
    return Math.round(amount);
  }

  // Note: Add 3-decimal logic if you ever expand to the Middle East
  if (["KWD", "BHD", "OMR"].includes(code)) {
    return Math.round(amount * 1000);
  }

  return Math.round(amount * 100);
}
