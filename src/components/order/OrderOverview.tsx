import React from "react";
import { Clock3 } from "lucide-react";

import { cn } from "@/lib/utils/helpers";

type OrderOverviewProps = React.ComponentProps<"button"> & {
  restaurantName: string;
  status: string;
  statusClassName?: string;
  etaMinutes: number;
  orderNumber: string;
};

export function OrderOverview({
  restaurantName,
  status,
  statusClassName,
  etaMinutes,
  orderNumber,
  className,
  ...props
}: OrderOverviewProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md",
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">Active order</p>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            statusClassName,
          )}
        >
          {status}
        </span>
      </div>

      <p className="line-clamp-1 text-sm font-medium text-slate-800">
        {restaurantName}
      </p>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          ETA {etaMinutes} min
        </span>
        <span className="font-medium text-slate-900">#{orderNumber}</span>
      </div>
    </button>
  );
}
