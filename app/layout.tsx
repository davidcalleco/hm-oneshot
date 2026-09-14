import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://hellomachine.studio";
const description =
  "Hello Machine is a design-led technology studio. We build the systems ambitious companies run on — websites, internal tools, automation and AI, made to be used rather than demoed.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hello Machine — Design-led technology studio",
    template: "%s — Hello Machine",
  },
  description,
  keywords: [
    "design-led technology studio",
    "AI systems",
    "business automation",
    "website design and development",
    "custom internal tools",
    "digital strategy",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Hello Machine",
    title: "Hello Machine — Design-led technology studio",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Machine — Design-led technology studio",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="type-label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
