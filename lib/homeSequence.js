export const HOME_SEQUENCE_FOLDER = "/sequences/demo2"
export const HOME_SEQUENCE_VERSION = "v5"
export const HOME_FRAME_COUNT = 672
export const HOME_INITIAL_FRAME_COUNT = Math.ceil(HOME_FRAME_COUNT * 0.25)

export const withHomeSequenceVersion = (src) => `${src}?v=${HOME_SEQUENCE_VERSION}`

export const homeFrameSrc = (frame) =>
  withHomeSequenceVersion(
    `${HOME_SEQUENCE_FOLDER}/${String(frame).padStart(4, "0")}.webp`,
  )
