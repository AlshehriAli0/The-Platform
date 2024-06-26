import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Platform",
  description: "Wavez challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body
        className={cn(
          "mx-auto min-h-screen max-w-[50rem] bg-background text-foreground antialiased",
          fontSans.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
