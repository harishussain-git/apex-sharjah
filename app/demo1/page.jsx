import HerotoWhite from "@/components/home/HerotoWhite"
import MoreDetails from "@/components/home/MoreDetails"
import Footer from "@/components/home/Footer"
import CtaSection from "@/components/home/CtaSection"
import LearningJourney from "@/components/home/LearningJourney"
import AssetLoader from "@/lib/AssetLoader"
import { demo1Assets } from "@/lib/pageAssets"


const Page = () => {
  return (
    <AssetLoader assets={demo1Assets} label="Loading Apex">
      <div>
        <HerotoWhite />
        <LearningJourney />
        <MoreDetails />
        <CtaSection />
        <Footer/>
      </div>
    </AssetLoader>
  )
}

export default Page
