import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "any1 — Anyone. Anytime. Anywhere.",
    template: "%s · any1",
  },
  description:
    "Die Sport- & Challenge-App, die jeden Schritt, jeden Schlag und jeden Höhenmeter in echten Wettkampf verwandelt. Apple Health & Google Fit ready.",
  metadataBase: new URL("https://any-1.de"),
  openGraph: {
    title: "any1 — Anyone. Anytime. Anywhere.",
    description:
      "Tägliche Challenges, smarte Leaderboards, echte Konkurrenz. any1 verbindet deine Fitness-Daten mit der weltweiten Community.",
    type: "website",
    siteName: "any1",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "any1 — Anyone. Anytime. Anywhere.",
    description: "Sport-Challenge-App. Track. Compete. Level up.",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg-base text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
