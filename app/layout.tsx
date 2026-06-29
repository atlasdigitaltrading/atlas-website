import type { Metadata } from "next";
import { DM_Sans, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

const siteTitle =
  "Atlas Digital Trading | Institutional Execution for Digital Assets";
const siteDescription =
  "Smart Order Routing, Execution Algorithms, and Pre-trade/Post-Trade TCA — the institutional execution infrastructure for digital assets.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atlasdigitaltrading.com"),
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://www.atlasdigitaltrading.com",
    siteName: "Atlas Digital Trading",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas Digital Trading — institutional EMS for digital assets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Atlas Digital Trading — institutional EMS for digital assets",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrument.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-atlas-bg font-body text-atlas-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
