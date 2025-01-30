import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
 * RootLayout component that provides the root layout for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
