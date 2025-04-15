import React from "react";
import type { Metadata, Viewport } from "next";
import "@/presentation/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/presentation/components/Header/Header";
import Footer from "@/presentation/components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessagesFromAPI } from "@/infrastructure/services/fetchMessagesFromAPI";
import SplashCursor from "@/presentation/components/SplashCursor/SplashCursor";
import { LoadingProvider } from "@/context/LoadingContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import { servicesUrls } from "@/infrastructure/constants/servicesUrls";

/**
 * Metadata for the application.
 */
export async function generateMetadata({ params }: { params: { locale: string; section: string } }): Promise<Metadata> {
  return {
    title: `Fredy Munevar - ${params.locale === "en" ? "Portfolio" : "Portafolio"} | ${params.section}`,
    description: `Fredy Munevar - ${params.locale === "en" ? "Portfolio" : "Portafolio"} | ${params.section}`,
    icons: {
      icon: [
        {
          url: "/favicon/icon-light.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon/icon-dark.png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [
        {
          url: "/favicon/apple-icon-light.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon/apple-icon-dark.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/favicon/apple-icon-x3-light.png",
          sizes: "180x180",
          type: "image/png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon/apple-icon-x3-dark.png",
          sizes: "180x180",
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: "/favicon/apple-touch-icon-precomposed-light.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "apple-touch-icon-precomposed",
          url: "/favicon/apple-touch-icon-precomposed-dark.png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
  };
}

/**
 * Metadata viewport for the application.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

/**
 * LocaleLayout component that provides the root layout for the application with translations.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!routing.locales.includes(locale as "en" | "es")) return notFound();

  const messages = await getMessagesFromAPI(locale);

  return (
    <html lang={locale}>
      <body className="antialiased p-[1px]">
        <SplashCursor />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LoadingProvider>
              <Header />
              {children}
              <Footer />
            </LoadingProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={`${servicesUrls.analytics}`} />
    </html>
  );
}
