import AssetLoader from "@/lib/AssetLoader"
import { homeCriticalAssets } from "@/lib/pageAssets"

import SiteFooter from "../layout/SiteFooter"
import HomeCtaSection from "./HomeCtaSection"
import HomeHeroSequence from "./HomeHeroSequence"
import MoreThanSchoolSection from "./MoreThanSchoolSection"
import SoundToggle from "./SoundToggle"

export default function HomePage() {
  return (
    <>
      <AssetLoader assets={homeCriticalAssets} label="Loading Apex">
        <main>
          <HomeHeroSequence />
          <MoreThanSchoolSection />
          <HomeCtaSection />
          <SiteFooter />
        </main>
      </AssetLoader>
      <SoundToggle />
    </>
  )
}
