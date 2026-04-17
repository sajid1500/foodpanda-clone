import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";
import OrderSidebar from "@/components/order/OrderSidebar";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <Header />
      <main>
        {children}
        <OrderSidebar />
      </main>
    </ReactQueryClientProvider>
  );
}
