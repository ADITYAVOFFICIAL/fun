import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DateDash",
  description: "Developed by Aditya Verma. A sleek, modern website to help you ask someone out on a date. Built using the latest technologies, including Next.js 14.2.4, Tailwind CSS, and Framer Motion, this project combines cutting-edge design and seamless animations to create an engaging user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} <div className="footer-container"><p className="footer">Developed by Aditya Verma</p></div></body>
     
    </html>
  );
}
