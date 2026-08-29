import { HOME_INITIAL_FRAME_COUNT, homeFrameSrc } from "./homeSequence"

export const homeCriticalAssets = [
  ...Array.from(
    { length: HOME_INITIAL_FRAME_COUNT },
    (_, index) => homeFrameSrc(index + 1),
  ),
  "/home/apex-logo-white.svg",
]
