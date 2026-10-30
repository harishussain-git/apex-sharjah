import "./globals.css"
import localFont from "next/font/local"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import SiteShell from "@/components/layout/SiteShell"
import StructuredData from "@/components/seo/StructuredData"
import { SITE_STRUCTURED_DATA } from "@/lib/structuredData"
import {
  createPageMetadata,
  GOOGLE_SITE_VERIFICATION,
  PAGE_SEO,
  SITE_ICONS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo"

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-sans",
})

const rfRufo = localFont({
  variable: "--font-accent",
  display: "swap",
  src: [
    { path: "../public/font/RFRufo-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/font/RFRufo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/font/RFRufo-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/font/RFRufo-Bold.woff2", weight: "700", style: "normal" },
  ],
})

// seo
export const metadata = {
  metadataBase: SITE_URL,
  ...createPageMetadata(PAGE_SEO.home),
  // Canonicals belong to individual pages, never to inherited site defaults.
  alternates: null,
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  icons: SITE_ICONS,
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${rfRufo.variable}`}
      style={{ backgroundColor: "#0b1220" }}
    >
      <body>
        <StructuredData id="site-structured-data" data={SITE_STRUCTURED_DATA} />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
