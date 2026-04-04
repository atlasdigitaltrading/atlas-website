import type { Metadata } from "next";
import { DM_Sans, Instrument_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atlasdigitaltrading.com"),
  icons: { icon: "/favicon.svg" },
  title:
    "Atlas Digital Trading | Institutional Execution for Digital Assets",
  description:
    "Smart Order Routing, Execution Algorithms, and Pre-trade/Post-Trade TCA — the institutional execution infrastructure for digital assets.",
  openGraph: {
    title: "Atlas Digital Trading",
    description: "Institutional Execution for Digital Assets",
    url: "https://www.atlasdigitaltrading.com",
    siteName: "Atlas Digital Trading",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Digital Trading",
    description: "Institutional Execution for Digital Assets",
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
      className={`${instrument.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-atlas-bg font-body text-atlas-white">
        {children}
      </body>
    </html>
  );
}
