import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./_components/Navigation";
import SmoothScroll from "./_components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONEXA — One Vision. Next Generation.",
  description: "We build intelligent systems, powerful software and next-generation digital experiences.",
  openGraph: {
    title: "ONEXA — One Vision. Next Generation.",
    description: "AI, automation and software engineered for what comes next.",
    siteName: "ONEXA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <a href="#main-content" className="sr-only z-[100] rounded bg-[#35d98a] px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
