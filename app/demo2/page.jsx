import HeroDemo2Seq from "@/components/home/HeroDemo2Seq"
import HeroOnly from "@/components/home/HeroOnly"
import MoreDetails from "@/components/home/MoreDetails"
import Footer from "@/components/home/Footer"
import CtaSection from "@/components/home/CtaSection"
import LearningJourney from "@/components/home/LearningJourney"
import MoresectionComingSoon from "@/components/home/MoresectionComingSoon"
import AssetLoader from "@/lib/AssetLoader"
import { demo2Assets } from "@/lib/pageAssets"


const Page = () => {
  return (
    <AssetLoader assets={demo2Assets} label="Loading Apex">
      <div>
        {/* <HeroOnly/> */}
        <HeroDemo2Seq />
        {/* <LearningJourney /> */}
        {/* <MoreDetails /> */}
        {/* <CtaSection /> */}
        <MoresectionComingSoon />
        <Footer />
      </div>
    </AssetLoader>
  )
}

export default Page
