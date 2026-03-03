import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
// import localFont from "next/font/local";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  preload: false,
});

// const agrandir = localFont({
//   src: "",
//   variable: "--font-agrandir", // This creates a CSS variable
//   preload: false,
// });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} antialiased`}
    >
      <body className="font-sans">
      {children}
      </body>
    </html>
  );
}
