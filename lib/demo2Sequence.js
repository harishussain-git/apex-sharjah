export const DEMO2_SEQUENCE_FOLDER = "/sequences/demo2"
export const DEMO2_FRAME_COUNT = 528
export const DEMO2_INITIAL_FRAME_COUNT = Math.ceil(DEMO2_FRAME_COUNT * 0.25)

export const demo2FrameSrc = (frame) =>
  `${DEMO2_SEQUENCE_FOLDER}/${String(frame).padStart(4, "0")}.webp`
