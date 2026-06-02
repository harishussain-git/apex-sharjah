import StickyHeader from "@/components/layout/StickyHeader"
import SoundBtn from "@/components/ui/SoundBtn"
import SmoothScrollProvider from "@/lib/SmoothScrollProvider"

export default function Demo1Layout({ children }) {
  return (
    <>
      <StickyHeader />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <SoundBtn />
    </>
  )
}
