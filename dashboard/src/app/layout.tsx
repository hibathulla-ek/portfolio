import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Process OS | Productivity Dashboard",
  description: "A highly functional personal and business productivity dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
