import type { Metadata } from "next";
import "@anyhive-kit/ui/globals.css";

export const metadata: Metadata = {
  title: "Anyhive Hosted",
  description: "Hosted checkout and customer portal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


