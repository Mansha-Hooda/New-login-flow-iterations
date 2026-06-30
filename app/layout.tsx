import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import BackToIterations from "./components/BackToIterations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MediBuddy — Login Flow Iterations",
  description: "UX explorations for the MediBuddy login experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lexendDeca.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BackToIterations />
        {children}
      </body>
    </html>
  );
}
