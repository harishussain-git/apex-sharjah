import HerotoWhite from "@/components/home/HerotoWhite"
import MoreDetails from "@/components/home/MoreDetails"
import Footer from "@/components/home/Footer"
import TextSection from "@/components/home/TextSection"
import CloudBus from "@/components/home/features/CloudBus"
import SliderFeatures from "@/components/home/SliderFeatures"
import CtaSection from "@/components/home/CtaSection"


const Page = () => {
  return (
    <div>
      <HerotoWhite />
      <SliderFeatures />
      {/* <TextSection/> */}
      {/* <CloudBus/> */}
      <MoreDetails />
      <CtaSection />
      <Footer/>
    </div>
  )
}

export default Page
