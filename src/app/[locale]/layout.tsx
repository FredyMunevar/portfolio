import React from "react";
import type { Metadata } from "next";
import "@/presentation/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/presentation/components/Header/Header";
import Footer from "@/presentation/components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SplashCursor from "@/presentation/components/SplashCursor/SplashCursor";

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: "Fredy Munevar - Portfolio",
  description: "Fredy Munevar - Portfolio",
  icons: {
    icon: [{ url: "favicon/icon.png" }, new URL("favicon/icon.png", "https://fredymunevar.com")],
    shortcut: ["favicon/shortcut-icon.png"],
    apple: [
      { url: "favicon/apple-icon.png" },
      { url: "favicon/apple-icon-x3.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "favicon/apple-touch-icon-precomposed.png",
      },
    ],
  },
};

/**
 * LocaleLayout component that provides the root layout for the application with translations.
 */
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure the locale is valid
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }
  // Load translations for the client
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={"antialiased"}>
        <SplashCursor />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
