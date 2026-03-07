import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import SubNav from "@/components/SubNav";
import Toast from "@/components/Toast";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snapbuy",
  description: "Online shop built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <SubNav />
          <CartDrawer />
          <Toast />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
