import { learningJourneyData } from "./learningJourney"

export const frameAssets = (folder, count) =>
  Array.from(
    { length: count },
    (_, index) => `${folder}/${String(index + 1).padStart(4, "0")}.webp`,
  )

const learningJourneyAssets = learningJourneyData.flatMap((item) => [
  item.img,
  item.video,
])

export const demo1Assets = [
  ...frameAssets("/sequences/new/hero-white-4", 194),
  ...learningJourneyAssets,
  "/home/apex-logo-white.svg",
]
