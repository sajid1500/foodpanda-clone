import type { Metadata } from "next";
import { Header } from "@/components/Header";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Header />
      <main>{children}</main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
