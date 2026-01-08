import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { FaviconHandler } from "@/components/favicon-handler";
import { rethinkSans, dmSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Antital - Turn your earnings into opportunities",
  description: "Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.",
  keywords: ["investment", "startups", "nigeria", "wealth creation", "fintech", "micro-investment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${rethinkSans.variable} antialiased overflow-x-hidden`}>
      <body className={`${dmSans.className} overflow-x-hidden`} suppressHydrationWarning>
        <FaviconHandler />
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            {children}
          </SidebarConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
