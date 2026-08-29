import SiteHeader from "@/components/layout/SiteHeader"
import SmoothScrollProvider from "@/lib/SmoothScrollProvider"

export default function SiteShell({ children }) {
  return (
    <>
      <SiteHeader />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </>
  )
}
