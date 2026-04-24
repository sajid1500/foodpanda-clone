import React from "react";

import { cn } from "@/lib/utils/helpers";

type ActiveOrdersListItem = {
  orderNumber: string;
  restaurantName: string;
  status: string;
  etaMinutes: number;
};

type ActiveOrdersListProps = {
  orders: ActiveOrdersListItem[];
  selectedOrderNumber: string;
  onSelectOrder: (orderNumber: string) => void;
  statusColorMap: Record<string, string>;
};

export function ActiveOrdersList({
  orders,
  selectedOrderNumber,
  onSelectOrder,
  statusColorMap,
}: ActiveOrdersListProps) {
  if (orders.length <= 1) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">
        Active orders ({orders.length})
      </h3>
      <div className="space-y-2 rounded-2xl border border-slate-200 p-3">
        {orders.map((item) => (
          <button
            key={item.orderNumber}
            type="button"
            className={cn(
              "w-full rounded-xl border p-3 text-left transition",
              item.orderNumber === selectedOrderNumber
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 hover:border-slate-300",
            )}
            onClick={() => onSelectOrder(item.orderNumber)}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-900">
                {item.restaurantName}
              </p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  statusColorMap[item.status],
                )}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              #{item.orderNumber} • ETA {item.etaMinutes} min
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
