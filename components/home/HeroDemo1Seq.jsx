"use client"

import { useRef } from "react"
import HeroContent2 from "./HeroContent2"
import TextSection from "./TextSection"
import SchoolFront from "./SchoolFront"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"

const frameCount = 194
const frameSrc = (frame) => `/sequences/new/hero-white-4/${String(frame).padStart(4, "0")}.webp`

// Baby-simple:
// `stepDurationDown` = how many seconds it takes to move to the next step when scrolling DOWN.
// `stepDurationUp` = how many seconds it takes to move to the previous step when scrolling UP.
// Bigger number = slower move. Smaller number = faster move.
const anchors = [
  {
    id: "hero",
    frame: 1,
    component: "HeroContent2",
    enter: { animation: "zoom-out", from: 1, to: 1 },
    exit: { animation: "zoom-in", from: 5, to: 10 },
    stepDurationDown: 4,
    stepDurationUp: 1,
  },
  {
    id: "white", frame: 144, component: "SchoolFront",
    enter: { animation: "zoom-out", from: 129, to: 144 },
    exit: { animation: "zoom-in", from: 144, to: 148 },
    stepDurationDown: 3,
    stepDurationUp: 1,
  },
  {
    id: "building", frame: 194, component: null,
    enter: { animation: "zoom-out", from: 180, to: 194 },
    exit: { animation: "zoom-in", from: 194, to: 194 },
    stepDurationDown: 1.3,
    stepDurationUp: 1.2
  },
]

const componentMap = {
  HeroContent2,
  TextSection,
  SchoolFront,
}

export default function HerotoFull() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { currentFrame } = useStrictSequenceScroll({
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
      {contentAnchors.map((anchor) => {
        const Content = componentMap[anchor.component]

        if (!Content) return null

        return (
          <div
            key={anchor.id}
            className="absolute inset-0 z-10 transform-gpu"
            style={{ ...getSequenceLayerStyle(anchor, currentFrame), willChange: "opacity, transform" }}
          >
            <Content />
          </div>
        )
      })}
    </section>
  )
}
