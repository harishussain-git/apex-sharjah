import "./globals.css"
import localFont from "next/font/local"
import { Lato } from "next/font/google"
import SiteShell from "@/components/layout/SiteShell"
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo"

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

const homeTitle = "Apex Vision Model School Sharjah | Character & Confidence"
const homeDescription =
  "Apex Vision Model School in Sharjah is a forward-thinking learning community where academic strength, values, creativity, and confidence grow together."

export const metadata = {
  metadataBase: SITE_URL,
  ...createPageMetadata({
    title: homeTitle,
    description: homeDescription,
    path: "/",
    absoluteTitle: true,
  }),
  title: {
    default: homeTitle,
    template: `%s | ${SITE_NAME}`,
  },
  verification: {
    google: "nYgVN_Qjwkroge7eYcIJqq6R6iS0BNTOSGwOkR89EF4",
  },
}
// google verification
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
