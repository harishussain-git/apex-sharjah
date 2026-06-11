import { learningJourneyData } from "./learningJourney"
import {
  DEMO2_FRAME_COUNT,
  DEMO2_INITIAL_FRAME_COUNT,
  DEMO2_SEQUENCE_FOLDER,
} from "./demo2Sequence"

export const frameAssets = (folder, count) =>
  Array.from(
    { length: count },
    (_, index) => `${folder}/${String(index + 1).padStart(4, "0")}.webp`,
  )

export const frameAssetsRange = (folder, start, count) =>
  Array.from(
    { length: Math.max(count, 0) },
    (_, index) => `${folder}/${String(start + index).padStart(4, "0")}.webp`,
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

export const demo2Assets = [
  ...frameAssets(DEMO2_SEQUENCE_FOLDER, DEMO2_FRAME_COUNT),
  "/home/apex-logo-white.svg",
]

export const demo2CriticalAssets = [
  ...frameAssetsRange(DEMO2_SEQUENCE_FOLDER, 1, DEMO2_INITIAL_FRAME_COUNT),
  "/home/apex-logo-white.svg",
]
