import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vico Investments Auto Group | Miami Used Cars",
  description: "Premium pre-owned vehicles in Miami, FL. BBB Accredited, honest pricing, quality vehicles. Browse our inventory and schedule a test drive today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
