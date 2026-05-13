import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tpcglobal.live"),
  title: {
    default: "TPC | Teens Prayer Conference",
    template: "%s | Teens Prayer Conference",
  },
  description: site.description,
  keywords: [
    "Teens Prayer Conference",
    "TPC",
    "Christian teens",
    "youth prayer",
    "teen conference Nigeria",
    "non-denominational youth ministry",
  ],
  authors: [{ name: "TPC" }],
  icons: {
    icon: [{ url: site.logo, sizes: "1024x1024", type: "image/png" }],
    shortcut: [site.logo],
    apple: [{ url: site.logo, sizes: "1024x1024", type: "image/png" }],
  },
  openGraph: {
    title: "TPC | Teens Prayer Conference",
    description: site.description,
    url: "https://tpcglobal.live",
    siteName: "Teens Prayer Conference",
    type: "website",
    images: [
      {
        url: site.logo,
        width: 1024,
        height: 1024,
        alt: "TPC logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TPC | Teens Prayer Conference",
    description: site.description,
    images: [site.logo],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
