import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cart } from "../validators/cart.schema";

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

export function getCartTotal(cart: Cart) {
  return cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}
export const calculateOrderTotals = (items: any[], deliveryFee: number) => {
  const subtotal = items.reduce((acc, i) => acc + i.unit_price * i.quantity, 0);
  return {
    subtotal,
    deliveryFee,
    totalAmount: subtotal + deliveryFee,
  };
};
export function calculateDeliveryEta(distance: number): number {
  return Math.round((distance / 1000) * 12); // 12 min per km
}

export function calculateDeliveryFee(distance: number): number {
  return Math.round((distance / 1000) * 10); // Tk10 per km
}
