import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import RevealEngine from "@/components/motion/RevealEngine";
import PageTransition from "@/components/motion/PageTransition";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://msgbridge.in"),
  title: { default: "MsgBridge — SMS, WhatsApp, RCS & Voice API for India", template: "%s | MsgBridge" },
  description:
    "One compliance-ready platform for SMS, WhatsApp, RCS, Voice and AI messaging in India. DLT and TRAI paperwork handled. Live in days, not quarters.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: "MsgBridge",
    type: "website",
    locale: "en_IN",
    url: "https://msgbridge.in",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${montserrat.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}[data-draw]{stroke-dashoffset:0!important}`}</style>
        </noscript>
      </head>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MsgBridge",
              url: "https://msgbridge.in",
              logo: "https://msgbridge.in/favicon.svg",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MsgBridge",
              url: "https://msgbridge.in",
            }),
          }}
        />
        <RevealEngine />
        <Header />
        <main className="pt-[var(--nav-h)]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
