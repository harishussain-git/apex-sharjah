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
      <section className="sr-only">
        <h1>Education that shapes character and confidence</h1>
        <p>
          Guiding every child with knowledge, values, and confidence for the future.
        </p>
        <h2>A welcoming start to every school day</h2>
        <p>
          Bright, calm spaces help children feel comfortable, confident, and ready to learn.
        </p>
        <h2>More than a school</h2>
        <p>
          Education is not just about classrooms and exams. It is about leadership,
          environment, values, and long-term thinking.
        </p>
      </section>
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
