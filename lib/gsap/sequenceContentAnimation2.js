"use client"

import gsap from "gsap"

export const contentAnimations = {
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
  "zoom-out": {
    from: { autoAlpha: 0, y: 24, scale: 1.08, filter: "blur(8px)" },
    to: { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  "zoom-in": {
    from: { autoAlpha: 0, y: -24, scale: 0.92, filter: "blur(8px)" },
    to: { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
}

export function setContentState(target, animation = "zoom-out", state = "from") {
  return gsap.set(target, contentAnimations[animation]?.[state] ?? contentAnimations.fade[state])
}

export function animateContent(
  target,
  animation = "zoom-out",
  { mode = "in", duration = 0.7, delay = 0, ease = "power3.out" } = {},
) {
  const variant = contentAnimations[animation] ?? contentAnimations.fade

  return mode === "out"
    ? gsap.to(target, { ...variant.from, duration, delay, ease, overwrite: "auto" })
    : gsap.fromTo(target, variant.from, {
        ...variant.to,
        duration,
        delay,
        ease,
        overwrite: "auto",
      })
}
