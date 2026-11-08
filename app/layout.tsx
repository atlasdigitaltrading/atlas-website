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
  "Atlas Digital Markets | Execution Intelligence for Institutional Trading";
const siteDescription =
  "Execution intelligence for institutional trading: equities, options, digital assets, tokenized stocks and prediction markets on one engine. AtlasX for the buy side, Atlas DESK for the sell side, Atlas TCA as standalone measurement, and Atlas Infrastructure behind partner platforms. Models that calibrate to each firm's own execution flow, so execution gets better the more you trade.";

export const metadata: Metadata = {
  metadataBase: new URL("https://atlasdigitaltrading.com"),
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://atlasdigitaltrading.com",
    siteName: "Atlas Digital Markets",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/og-home-v4.png",
        width: 1200,
        height: 630,
        alt: "Atlas Digital Markets: execution intelligence for institutional trading. AtlasX, Atlas DESK, Atlas TCA, Atlas Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: {
      url: "/og/og-home-v4.png",
      width: 1200,
      height: 630,
      alt: "Atlas Digital Markets: execution intelligence for institutional trading. AtlasX, Atlas DESK, Atlas TCA, Atlas Infrastructure",
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
