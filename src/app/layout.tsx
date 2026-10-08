import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { shop } from "@/data/shop";
import { SITE_NAME } from "@/lib/seo";
import { BookingProvider } from "@/components/booking/BookingContext";
import { BarberChooser } from "@/components/booking/BarberChooser";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { BottomBar } from "@/components/site/BottomBar";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-serif-4",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(shop.url),
  title: { default: `${SITE_NAME} · Barbershop in Savannah, GA`, template: `%s · ${SITE_NAME}` },
  description: shop.description,
  applicationName: SITE_NAME,
  // Preview builds (GitHub Pages) must never be indexed ahead of the real domain.
  robots: process.env.NEXT_PUBLIC_PREVIEW === "1" ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="ui sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <BookingProvider>
          <Nav />
          <main id="main" className="flex-1 pb-bar">
            {children}
          </main>
          <Footer />
          <BottomBar />
          <BarberChooser />
        </BookingProvider>
        {plausibleDomain ? (
          <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
