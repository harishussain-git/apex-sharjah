import "./globals.css"
import StickyHeader from "../components/layout/StickyHeader"
// import AssetLoader from "@/lib/AssetLoader"
import SmoothScrollProvider from "@/lib/SmoothScrollProvider"
import SoundBtn from "../components/ui/SoundBtn"


export const metadata = {
  title: "Apex New",
  description: "Next.js homepage animation starter with GSAP, ScrollTrigger, Lenis, and Tailwind.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {/* <AssetLoader> */}
          <StickyHeader />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <SoundBtn />
        {/* </AssetLoader> */}
      </body>
    </html>
  )
}
