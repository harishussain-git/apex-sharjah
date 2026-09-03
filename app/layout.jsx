import "./globals.css"
import localFont from "next/font/local"
import { Lato } from "next/font/google"
import SiteShell from "@/components/layout/SiteShell"
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

export const metadata = {
  metadataBase: SITE_URL,
  ...createPageMetadata(PAGE_SEO.home),
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
