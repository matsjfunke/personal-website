import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "katex/dist/katex.min.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mats J Funke",
  description: "Personal website of Mats J Funke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
