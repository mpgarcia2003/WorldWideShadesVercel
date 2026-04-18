import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/shell/Header";
import { ShellWrapper } from "@/components/shell/ShellWrapper";
import { Providers } from "@/components/shared/Providers";
import { GlobalPhoneTracker } from "@/components/shared/GlobalPhoneTracker";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { BehaviorTracker } from "@/components/shared/BehaviorTracker";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationJsonLd, websiteJsonLd, localBusinessJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/constants";
import "@/styles/globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: "Custom roller shades direct to your door. 700+ premium fabrics, blackout & light filtering, motorized options. Free shipping.",
  openGraph: { type: "website", locale: "en_US", siteName: SITE.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const GTM_ID = "GTM-KG4QRBT8";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
      </head>
      <body className="font-body antialiased text-dark bg-white">
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        <Script id="datalayer-init" strategy="beforeInteractive">{`window.dataLayer = window.dataLayer || [];`}</Script>
        <Script id="clarity" strategy="afterInteractive" src="https://www.clarity.ms/tag/wd2vttf1qj" />
        <div className="flex min-h-screen flex-col">
          <Providers>
            <GlobalPhoneTracker />
            <BehaviorTracker />
            <ExitIntentPopup page="builder" />
            <ShellWrapper>
              <Header />
              <main className="flex-1">{children}</main>
            </ShellWrapper>
          </Providers>
        </div>
      </body>
    </html>
  );
}
