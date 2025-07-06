import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "katex/dist/katex.min.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mats J Funke",
    template: "%s | Mats J Funke",
  },
  description:
    "Personal website of Mats J Funke, sharing thoughts on software engineering, AI, and life.",
  keywords: [
    "Mats J Funke",
    "Software Engineer",
    "Technology",
    "Programming",
    "Web Development",
    "Personal Website",
    "Blog",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Deep Learning",
    "Neural Networks",
    "Computer Vision",
    "Natural Language Processing",
    "Compendiums",
    "Technical Guides",
    "Books",
  ],
  authors: [{ name: "Mats J Funke" }],
  creator: "Mats J Funke",
  publisher: "Mats J Funke",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://matsjfunke.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://matsjfunke.com",
    title: "Mats J Funke",
    description:
      "Personal website of Mats J Funke, a software engineer, sharing thoughts on technology, life and AI.",
    siteName: "Mats J Funke",
  },
  twitter: {
    card: "summary",
    title: "Mats J Funke",
    description:
      "Personal website of Mats J Funke, a software engineer, sharing thoughts on technology, life and AI.",
    creator: "@matsjfunke13",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <TooltipProvider>
          <Navbar />
          {children}
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
