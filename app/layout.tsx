import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Automotive System",
  description:
    "looking for a car? We got you covered. Buy cars and hire cars easily and quickly with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} w-full`}>{children}</body>
    </html>
  );
}
