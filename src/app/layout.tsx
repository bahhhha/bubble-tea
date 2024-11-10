import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { AntdProvider } from "@/shared/config/antdConfig";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Джус боллы",
  description: "Купить Джус боллы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdProvider>
      <html lang="en" className={manrope.className}>
        <body className="p-5">{children}</body>
      </html>
    </AntdProvider>
  );
}
