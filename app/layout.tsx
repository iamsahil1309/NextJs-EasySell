import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCanonicalUrl } from "@/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase : new URL(getCanonicalUrl()),
  title: "Easy Sell",
  description:
    "Discover the Power of simplicity with Easy Sell - the ultimate solution for effortless selling products. Unlock convenience and boost your sales.",
  openGraph: {
    images: [`/assets/og-image.png`],
  },
  alternates : {
    canonical : "/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="bg-gray-951 py-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
