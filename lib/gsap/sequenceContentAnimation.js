"use client"

const clamp = (value) => Math.min(Math.max(value, 0), 1)

// Converts a frame range into 0 -> 1 progress.
// Example:
// from: 24, to: 28
// frame 24 = 0
// frame 26 = 0.5
// frame 28 = 1
const rangeProgress = (frame, from, to) => clamp((frame - from) / (to - from || 1))

const animationStyle = (animation, progress, leaving = false) => {
  // "fade" = opacity only
  if (animation === "fade") {
    return {
      opacity: leaving ? 1 - progress : progress,
      transform: "translate3d(0, 0, 0) scale(1)",
      filter: "blur(0px)",
    }
  }

  // "zoom-in"
  // Change these values if you want stronger/weaker motion:
  // - 24 = vertical movement in px
  // - 0.08 = scale amount
  // - 10 = blur amount
  if (animation === "zoom-in") {
    return {
      opacity: leaving ? 1 - progress : progress,
      transform: `translate3d(0, ${leaving ? progress * -24 : (1 - progress) * 24}px, 0) scale(${leaving ? 1 + progress * 0.38 : 1.08 - progress * 0.38})`,
      filter: `blur(${leaving ? progress * 10 : (1 - progress) * 10}px)`,
    }
  }

  // Default = "zoom-out"
  // Change these values if you want stronger/weaker motion:
  // - 18 = vertical movement in px
  // - 0.08 = scale amount
  // - 8 = blur amount
  return {
    opacity: leaving ? 1 - progress : progress,
    transform: `translate3d(0, ${leaving ? progress * 18 : (1 - progress) * 18}px, 0) scale(${leaving ? 1 - progress * 0.08 : 1.08 - progress * 0.08})`,
    filter: `blur(${leaving ? progress * 8 : (1 - progress) * 8}px)`,
  }
}

export function getSequenceLayerStyle(anchor, frame) {
  // Enter animation:
  // Controlled by anchor.enter.from and anchor.enter.to
  // Wider range = slower reveal
  if (anchor.enter && frame < anchor.enter.to) {
    return animationStyle(anchor.enter.animation, rangeProgress(frame, anchor.enter.from, anchor.enter.to))
  }

  // Exit animation:
  // Controlled by anchor.exit.from and anchor.exit.to
  // Wider range = slower exit
  if (anchor.exit && frame >= anchor.exit.from) {
    const progress = rangeProgress(frame, anchor.exit.from, anchor.exit.to)
    return {
      ...animationStyle(anchor.exit.animation, progress, true),
      pointerEvents: progress >= 1 ? "none" : "auto",
    }
  }

  return {
    opacity: 1,
    transform: "translate3d(0, 0, 0) scale(1)",
    filter: "blur(0px)",
  }
}
