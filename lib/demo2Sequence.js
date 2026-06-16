export const DEMO2_SEQUENCE_FOLDER = "/sequences/demo2"
export const DEMO2_SEQUENCE_VERSION = "v2"
export const DEMO2_FRAME_COUNT = 867
export const DEMO2_INITIAL_FRAME_COUNT = Math.ceil(DEMO2_FRAME_COUNT * 0.25)

export const withDemo2Version = (src) => `${src}?v=${DEMO2_SEQUENCE_VERSION}`

export const demo2FrameSrc = (frame) =>
  withDemo2Version(
    `${DEMO2_SEQUENCE_FOLDER}/${String(frame).padStart(4, "0")}.webp`,
  )

export const demo2PreviewSrc = demo2FrameSrc(1)
