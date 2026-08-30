import manifest from "./sequence/homeSequence.manifest.json"

export const HOME_SEQUENCE_FOLDER = manifest.publicPath
export const HOME_SEQUENCE_VERSION = manifest.version
export const HOME_FRAME_COUNT = manifest.frameCount
export const HOME_INITIAL_FRAME_COUNT = manifest.initialFrameCount
export const HOME_CONTENT_ANIMATION = manifest.contentAnimation
export const HOME_SEQUENCE_SECTIONS = manifest.sections

const withHomeSequenceVersion = (source) =>
  `${source}?v=${HOME_SEQUENCE_VERSION}`

export const homeFrameSrc = (frame) => {
  const safeFrame = Math.max(
    1,
    Math.min(HOME_FRAME_COUNT, Math.round(frame)),
  )
  const section = HOME_SEQUENCE_SECTIONS.find(
    ({ startFrame, endFrame }) =>
      safeFrame >= startFrame && safeFrame <= endFrame,
  )

  if (!section) {
    throw new Error(`No home sequence section contains frame ${safeFrame}.`)
  }

  const localFrame = safeFrame - section.startFrame + 1
  const fileName = `${String(localFrame).padStart(4, "0")}.webp`

  return withHomeSequenceVersion(
    `${HOME_SEQUENCE_FOLDER}/${section.folder}/${fileName}`,
  )
}
