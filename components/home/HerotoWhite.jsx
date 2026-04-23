"use client"

import { useRef } from "react"
import HeroContent from "./HeroContent"
import DebugPanel from "../../lib/DebugPanel"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"

const frameCount = 163
const frameSrc = (frame) => `/sequences/new/hero-white-3/${String(frame).padStart(4, "0")}.webp`

const anchors = [
  {
    id: "hero",
    frame: 1,
    component: "HeroContent",
    enter: { animation: "zoom-out", from: 1, to: 1 },
    exit: { animation: "zoom-in", from: 5, to: 10 },
    stepDuration: 1,
  },
  { id: "test", frame: 28, component: null, stepDuration: 1 },
  { id: "white", frame: 163, component: null, stepDuration: 4 },
]

const componentMap = {
  HeroContent,
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
    const progress = rangeProgress(frame, anchor.enter.from, anchor.enter.to)
    return animationStyle(anchor.enter.animation, progress)
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

export default function HerotoWhite() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { currentFrame, progress, activeAnchor } = useStrictSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount,
    frameSrc,
    anchors,
  })
  const contentAnchors = anchors.filter((anchor) => anchor.component)

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <DebugPanel
        label="Hero To White"
        currentFrame={currentFrame}
        frameCount={frameCount}
        progress={progress}
        activeAnchor={activeAnchor}
      />
      {contentAnchors.map((anchor) => {
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
