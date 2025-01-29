import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: "Fredy Munevar - Portfolio",
  description: "Fredy Munevar - Portfolio",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
