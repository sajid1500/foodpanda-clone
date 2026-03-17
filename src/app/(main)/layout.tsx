import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <Header />
      <main>{children}</main>
    </ReactQueryClientProvider>
  );
}
