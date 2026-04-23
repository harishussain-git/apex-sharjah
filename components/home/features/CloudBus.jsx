"use client"

import { useRef } from "react"
import { useSimpleSequenceScroll } from "../../../lib/gsap/SimpleSequenceScroll"
import SchoolFront from "../SchoolFront"

const frameCount = 136
const frameSrc = (frame) => `/sequences/new/white-bus-3/${String(frame).padStart(4, "0")}.webp`

const anchors = [
  {
    id: "cloud",
    frame: 1,
    component: "SchoolFront",
    enter: { animation: "zoom-out", from: 120, to: 136 },
    // exit: { animation: "zoom-in", from: 54, to: 80 },
  },
  { id: "bus", frame: 136, component: null },
]

const componentMap = {
  SchoolFront,
}

const clamp = (value) => Math.min(Math.max(value, 0), 1)
const rangeProgress = (frame, from, to) => clamp((frame - from) / (to - from || 1))

const animationStyle = (animation, progress, leaving = false) => {
  if (animation === "zoom-in") {
    return {
      opacity: leaving ? 1 - progress : progress,
      transform: `scale(${leaving ? 1 + progress * 0.08 : 1.08 - progress * 0.08})`,
    }
  }

  return {
    opacity: leaving ? 1 - progress : progress,
    transform: `scale(${leaving ? 1 - progress * 0.08 : 1.08 - progress * 0.08})`,
  }
}

const layerStyle = (anchor, frame) => {
  if (anchor.enter && frame < anchor.enter.to) {
    return animationStyle(anchor.enter.animation, rangeProgress(frame, anchor.enter.from, anchor.enter.to))
  }

  if (anchor.exit && frame >= anchor.exit.from) {
    const progress = rangeProgress(frame, anchor.exit.from, anchor.exit.to)
    return {
      ...animationStyle(anchor.exit.animation, progress, true),
      pointerEvents: progress >= 1 ? "none" : "auto",
    }
  }

  return { opacity: 1, transform: "scale(1)" }
}

function CloudBusContent() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center px-6 pb-14 text-center md:items-center md:pb-0">
      {/* <div className="max-w-3xl">
        <p className="text-eyebrow text-[var(--color-primary-500)]">Safe school transport</p>
        <h2 className="text-display uppercase tracking-tight text-[var(--color-primary-500)]">
          A smoother journey from home to school
        </h2>
        <p className="mx-auto mt-5 hidden max-w-2xl text-body-lg text-neutral-600 md:block">
          Reliable routes, calm movement, and a school day that begins before students reach the gate.
        </p>
      </div> */}
    </div>
  )
}

export default function CloudBus() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { currentFrame } = useSimpleSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount,
    frameSrc,
    anchors,
    scrollScreens: 2,
  })

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {anchors
        .filter((anchor) => anchor.component)
        .map((anchor) => {
          const Content = componentMap[anchor.component]

          if (!Content) return null

          return (
            <div
              key={anchor.id}
              className="absolute inset-0 z-10 transform-gpu"
              style={{ ...layerStyle(anchor, currentFrame), willChange: "opacity, transform" }}
            >
              <Content />
            </div>
          )
        })}
    </section>
  )
}
