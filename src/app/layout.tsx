import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { FaviconHandler } from "@/components/favicon-handler";
import { Toaster } from "@/components/ui/sonner";
import { rethinkSans, dmSans } from "@/lib/fonts";
import { QueryProvider } from "@/components/query-provider";

export const metadata: Metadata = {
  title: "Antital - Turn your earnings into opportunities",
  description: "Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.",
  keywords: ["investment", "startups", "nigeria", "wealth creation", "fintech", "micro-investment"],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${rethinkSans.variable} antialiased overflow-x-hidden`}>
      <body className={dmSans.className} suppressHydrationWarning>
        <FaviconHandler />
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
          </SidebarConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
