import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider";
import { ThemeProvider } from "@/contexts/theme-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GamErz - Gaming Community Platform",
  description: "Connect, chat, and game with fellow enthusiasts in real-time",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

import "./globals.css";
