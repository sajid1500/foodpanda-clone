"use client";

import React, { useMemo } from "react";
import { MapPin, ReceiptText } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/helpers";
import { OrderOverview } from "./OrderOverview";

type OrderStatus =
  | "Order placed"
  | "Restaurant accepted"
  | "Preparing"
  | "Rider assigned"
  | "On the way";

type ActiveOrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

type ActiveOrder = {
  orderNumber: string;
  restaurantName: string;
  status: OrderStatus;
  etaMinutes: number;
  placedAt: string;
  deliveryAddress: string;
  paymentMethod: string;
  items: ActiveOrderItem[];
  deliveryFee: number;
  serviceFee: number;
  note?: string;
};

type OrderSidebarProps = {
  order?: ActiveOrder;
};

const statusColorMap: Record<OrderStatus, string> = {
  "Order placed": "bg-slate-100 text-slate-700",
  "Restaurant accepted": "bg-sky-100 text-sky-700",
  Preparing: "bg-amber-100 text-amber-700",
  "Rider assigned": "bg-violet-100 text-violet-700",
  "On the way": "bg-emerald-100 text-emerald-700",
};

const sampleOrder: ActiveOrder = {
  orderNumber: "FP-10294",
  restaurantName: "Kacchi Bhai",
  status: "Preparing",
  etaMinutes: 28,
  placedAt: "Today, 7:12 PM",
  deliveryAddress: "House 12, Road 7, Dhanmondi, Dhaka",
  paymentMethod: "Cash on delivery",
  items: [
    { id: "1", name: "Kacchi Platter", quantity: 1, unitPrice: 450 },
    { id: "2", name: "Borhani", quantity: 1, unitPrice: 80 },
    { id: "3", name: "Jali Kebab", quantity: 2, unitPrice: 120 },
  ],
  deliveryFee: 40,
  serviceFee: 20,
  note: "Please call when rider reaches the gate.",
};

const formatPrice = (amount: number) => `Tk ${amount.toFixed(0)}`;

export default function OrderSidebar({
  order = sampleOrder,
}: OrderSidebarProps) {
  const subtotal = useMemo(() => {
    return order.items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0,
    );
  }, [order.items]);

  const total = subtotal + order.deliveryFee + order.serviceFee;

  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <OrderOverview
          restaurantName={order.restaurantName}
          status={order.status}
          statusClassName={statusColorMap[order.status]}
          etaMinutes={order.etaMinutes}
          orderNumber={order.orderNumber}
        />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full overflow-y-auto px-5 pt-5 sm:max-w-md"
      >
        <SheetHeader className="space-y-1 pr-10">
          <SheetTitle className="text-xl font-semibold">
            Order details
          </SheetTitle>
          <SheetDescription>
            Track your active order and review all delivery details.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5 pb-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600">{order.restaurantName}</p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  Order #{order.orderNumber}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  statusColorMap[order.status],
                )}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Estimated time</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {order.etaMinutes} min
                </p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Placed at</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {order.placedAt}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ReceiptText className="h-4 w-4" />
              Items
            </h3>

            <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qty {item.quantity}
                    </p>
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
                  <span>{formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service fee</span>
                  <span>{formatPrice(order.serviceFee)}</span>
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

          <section className="space-y-3">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPin className="h-4 w-4" />
              Delivery details
            </h3>

            <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Address</p>
              <p className="mt-1">{order.deliveryAddress}</p>

              <Separator className="my-3" />

              <p className="font-medium text-slate-900">Payment method</p>
              <p className="mt-1">{order.paymentMethod}</p>

              {order.note ? (
                <>
                  <Separator className="my-3" />
                  <p className="font-medium text-slate-900">Rider note</p>
                  <p className="mt-1">{order.note}</p>
                </>
              ) : null}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
