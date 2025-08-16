import type { Metadata } from "next";
import { sans, mono, serif } from "./fonts";
import { cn } from "@/lib/utils"
import "./globals.css";
import Template from "./template"
import Script from 'next/script';
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/disable-draftmode";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AppProvider } from '@/context/app';
// import { CookieConsentBanner } from '@/components/cookie-consent';

export const metadata: Metadata = {
  title: "Denver Contact Improv",
  description: "Discover Denver Contact Improv — a dynamic movement community exploring connection, spontaneity, and embodied creativity through contact improvisation. Join our weekly jams, classes, and events.",
  openGraph: {
    images: ['https://cdn.sanity.io/images/evjpv7og/production/7105e194880bea48f429f16d72c136752f925735-2048x1278.jpg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
      sans.variable,
      mono.variable,
      serif.variable
    )}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased font-sans">
        <AppProvider>
          <Header />
          <Template>
            {children}
            <SanityLive />
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
            <Script
              defer
              data-domain="denvercontactimprov.com"
              src="https://plausible.io/js/script.hash.outbound-links.js"
              strategy="afterInteractive"
            />
            {/* Plausible initialization script for custom events */}
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
            {/* <CookieConsentBanner /> */}
          </Template>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
