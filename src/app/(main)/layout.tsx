import type { Metadata } from "next";
import { Header } from "@/components/Header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
