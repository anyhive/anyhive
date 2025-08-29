import type { Metadata } from "next";
import "@moneta-kit/ui/globals.css";

export const metadata: Metadata = {
  title: "Moneta Hosted",
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


