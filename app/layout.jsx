import "./globals.css"
import localFont from "next/font/local"
import { Lato } from "next/font/google"
import StickyHeader from "../components/layout/StickyHeader"
// import AssetLoader from "@/lib/AssetLoader"
import SmoothScrollProvider from "@/lib/SmoothScrollProvider"
import SoundBtn from "../components/ui/SoundBtn"

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
  title: "Apex",
  description: "Apex Vision Model School Sharjah",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${rfRufo.variable}`}
      style={{ backgroundColor: "#0b1220" }}
    >
      <body style={{ backgroundColor: "#0b1220" }}>
        {/* <AssetLoader> */}
          <StickyHeader />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <SoundBtn />
        {/* </AssetLoader> */}
      </body>
    </html>
  )
}
