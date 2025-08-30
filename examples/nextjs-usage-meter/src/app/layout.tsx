import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@moneta-kit/react/styles.css";
import { MonetaProvider } from "@moneta-kit/react/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moneta Kit - Build metered AI apps in hours, not days",
  description: "Beautiful usage tracking components with built-in metering, gates, and upgrade flows. Fully customizable React components for your AI applications.",
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
        <MonetaProvider publishableKey={process.env.NEXT_PUBLIC_MONETA_PUBLISHABLE_KEY}>
          {children}
        </MonetaProvider>
      </body>
    </html>
  );
}
