"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn, formatAddress, formatUserAddress } from "@/lib/utils/helpers";
import { ActiveOrdersList } from "./ActiveOrdersList";
import { OrderItemsSection } from "./OrderItemsSection";
import { OrderOverview } from "./OrderOverview";
import { useOrders } from "./useOrders";
import { Address } from "@/lib/validators/address.schema";

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
  orders?: ActiveOrder[];
  order?: ActiveOrder;
};

const statusColorMap: Record<OrderStatus, string> = {
  "Order placed": "bg-slate-100 text-slate-700",
  "Restaurant accepted": "bg-sky-100 text-sky-700",
  Preparing: "bg-amber-100 text-amber-700",
  "Rider assigned": "bg-violet-100 text-violet-700",
  "On the way": "bg-emerald-100 text-emerald-700",
};

const sampleOrders: ActiveOrder[] = [
  {
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
  },
  {
    orderNumber: "FP-10310",
    restaurantName: "Burger Lab",
    status: "Rider assigned",
    etaMinutes: 19,
    placedAt: "Today, 7:48 PM",
    deliveryAddress: "House 12, Road 7, Dhanmondi, Dhaka",
    paymentMethod: "Card",
    items: [
      { id: "4", name: "Smoked Beef Burger", quantity: 2, unitPrice: 320 },
      { id: "5", name: "Loaded Fries", quantity: 1, unitPrice: 210 },
    ],
    deliveryFee: 35,
    serviceFee: 18,
  },
];

const formatPrice = (amount: number) => `Tk ${amount.toFixed(0)}`;

export default function OrderSidebar({ orders, order }: OrderSidebarProps) {
  const { orders: fetchedOrders } = useOrders();

  // Transform fetched orders to display format
  const transformedOrders = useMemo(() => {
    if (!fetchedOrders || fetchedOrders.length === 0) return [];

    return fetchedOrders.map((o: any) => ({
      orderNumber: o.orderNumber,
      restaurantName: o.restaurant?.name || "Unknown Restaurant",
      status: (o.status || "Order placed") as OrderStatus,
      etaMinutes: 25, // Placeholder - adjust based on actual data if available
      placedAt: o.createdAt
        ? new Date(o.createdAt).toLocaleString()
        : "Just now",
      deliveryAddress: o.deliveryAddress,
      paymentMethod: o.payments?.[0]?.paymentMethod || "Cash on delivery",
      items: (o.orderItems || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      deliveryFee: o.deliveryFee || 0,
      serviceFee: 0, // Adjust if service fee exists in schema
      note: o.note,
    }));
  }, [fetchedOrders]);

  const availableOrders =
    orders && orders.length > 0
      ? orders
      : order
        ? [order]
        : transformedOrders.length > 0
          ? transformedOrders
          : sampleOrders;

  const [selectedOrderNumber, setSelectedOrderNumber] = useState(
    availableOrders[0]?.orderNumber,
  );

  useEffect(() => {
    if (
      !availableOrders.some((item) => item.orderNumber === selectedOrderNumber)
    ) {
      setSelectedOrderNumber(availableOrders[0]?.orderNumber);
    }
  }, [availableOrders, selectedOrderNumber]);

  const activeOrder =
    availableOrders.find((item) => item.orderNumber === selectedOrderNumber) ??
    availableOrders[0];

  const subtotal = useMemo(() => {
    return activeOrder.items.reduce(
      (total: number, item: ActiveOrderItem) =>
        total + item.quantity * item.unitPrice,
      0,
    );
  }, [activeOrder.items]);

  const total = subtotal + activeOrder.deliveryFee + activeOrder.serviceFee;

  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <OrderOverview
          restaurantName={activeOrder.restaurantName}
          status={activeOrder.status}
          statusClassName={statusColorMap[activeOrder.status]}
          etaMinutes={activeOrder.etaMinutes}
          orderNumber={activeOrder.orderNumber}
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
          <ActiveOrdersList
            orders={availableOrders}
            selectedOrderNumber={activeOrder.orderNumber}
            onSelectOrder={setSelectedOrderNumber}
            statusColorMap={statusColorMap}
          />

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600">
                  {activeOrder.restaurantName}
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  Order #{activeOrder.orderNumber}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  statusColorMap[activeOrder.status],
                )}
              >
                {activeOrder.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Estimated time</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {activeOrder.etaMinutes} min
                </p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Placed at</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {activeOrder.placedAt}
                </p>
              </div>
            </div>
          </section>

          <OrderItemsSection
            items={activeOrder.items}
            subtotal={subtotal}
            deliveryFee={activeOrder.deliveryFee}
            serviceFee={activeOrder.serviceFee}
            total={total}
            formatPrice={formatPrice}
          />

          <section className="space-y-3">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPin className="h-4 w-4" />
              Delivery details
            </h3>

            <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Address</p>
              <p className="mt-1">
                {formatUserAddress(
                  activeOrder.deliveryAddress.address,
                  activeOrder.deliveryAddress.city,
                )}
              </p>

              <Separator className="my-3" />

              <p className="font-medium text-slate-900">Payment method</p>
              <p className="mt-1">{activeOrder.paymentMethod}</p>

              {activeOrder.note ? (
                <>
                  <Separator className="my-3" />
                  <p className="font-medium text-slate-900">Rider note</p>
                  <p className="mt-1">{activeOrder.note}</p>
                </>
              ) : null}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
