import React from "react";
import { ReceiptText } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type OrderItemsSectionProps = {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  formatPrice: (amount: number) => string;
};

export function OrderItemsSection({
  items,
  subtotal,
  deliveryFee,
  serviceFee,
  total,
  formatPrice,
}: OrderItemsSectionProps) {
  return (
    <section className="space-y-3">
      <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
        <ReceiptText className="h-4 w-4" />
        Items
      </h3>

      <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">Qty {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {formatPrice(item.quantity * item.unitPrice)}
            </p>
          </div>
        ))}

        <Separator />

        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery fee</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Service fee</span>
            <span>{formatPrice(serviceFee)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">
            Total paid
          </span>
          <span className="text-base font-bold text-slate-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </section>
  );
}
