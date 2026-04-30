import { getOrdersAction } from "@/lib/actions/order";
import { getBrowserClient } from "@/lib/config/supabase/client";
import { getServerClient } from "@/lib/config/supabase/server";
import { getOrdersByStatus } from "@/lib/services/orderService";
import { Tables } from "@/lib/types/database.types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Orders = Tables<"orders">;

export function useOrders() {
  const queryClient = useQueryClient();
  const queryKey = ["orders"];

  // 1. The Initial Fetch
  const {
    data: orders,
    error,
    isPending: isLoading,
  } = useQuery({
    queryKey,
    queryFn: getOrdersAction, // Fetch only "preparing" orders initially
  });

  const supabase = getBrowserClient();
  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on<Orders>(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey });
          //   queryClient.setQueryData(queryKey, (oldData: Orders[]) => {
          //     if (payload.eventType === "INSERT")
          //       return [...oldData, payload.new];
          //     if (payload.eventType === "UPDATE")
          //       return oldData.map((item) =>
          //         item.id === payload.new.id ? payload.new : item,
          //       );
          //   });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { orders, error, isLoading };
}
