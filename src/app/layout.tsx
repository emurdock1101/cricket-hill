import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cricket Hill — Generators, Fireworks & Whatever Else You Need",
  description:
    "Home generators. Musical firework shows. Delivery of... things. Cricket Hill has you covered. Probably.",
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
