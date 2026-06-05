"use client"

import { useRef } from "react"
import HeroContent2 from "./HeroContent2"
import ArtsCard from "./facilities/ArtsCard"
import ClassroomCard from "./facilities/ClassroomCard"
import EarlyDevelopmentCard from "./facilities/EarlyDevelopmentCard"
import FoodCard from "./facilities/FoodCard"
import InnovationLabsCard from "./facilities/InnovationLabsCard"
import ReverseEngineeringCard from "./facilities/ReverseEngineeringCard"
import SchoolFront2 from "./SchoolFront2"
import LearningJourneyControlsDemo2 from "../ui/LearningJourneyControlsDemo2"
import LearningJourneyProgressDemo2 from "../ui/LearningJourneyProgressDemo2"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"

const frameCount = 388
const frameSrc = (frame) => `/sequences/demo2/${String(frame).padStart(4, "0")}.webp`

// Explanation:
// `stepDurationDown` = how many seconds it takes to move to the next step when scrolling DOWN.
// `stepDurationUp` = how many seconds it takes to move to the previous step when scrolling UP.
// Bigger number = slower move. Smaller number = faster move.
const anchors = [
  {
    id: "demo2-hero",
    frame: 1,
    component: "HeroContent2",
    enter: { animation: "zoom-out", from: 1, to: 1 },
    exit: { animation: "zoom-in", from: 5, to: 10 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "demo2-schoolfront", frame: 45, component: "SchoolFront2",
    enter: { animation: "zoom-out", from: 40, to: 45 },
    exit: { animation: "zoom-in", from: 47, to: 50 },
    stepDurationDown: 1.2,
    stepDurationUp: 1,
  },
  {
    id: "demo2-classroom", frame: 103, component: "ClassroomCard",
    enter: { animation: "zoom-out", from: 100, to: 103 },
    exit: { animation: "zoom-in", from: 106, to: 110 },
    stepDurationDown: 2,
    stepDurationUp: 0.5
  },
  {
    id: "demo2-early-development", frame: 134, component: "EarlyDevelopmentCard",
    enter: { animation: "zoom-out", from: 130, to: 134 },
    exit: { animation: "zoom-in", from: 136, to: 140 },
    stepDurationDown: 1,
    stepDurationUp: 0.5
  },
  {
    id: "demo2-innovation-labs", frame: 168, component: "InnovationLabsCard",
    enter: { animation: "zoom-out", from: 160, to: 168 },
    exit: { animation: "zoom-in", from: 170, to: 175 },
    stepDurationDown: 1.2,
    stepDurationUp: 1
  },
  {
    id: "demo2-arts", frame: 266, component: "ArtsCard",
    enter: { animation: "zoom-out", from: 260, to: 266 },
    exit: { animation: "zoom-in", from: 268, to: 273 },
    stepDurationDown: 2.5,
    stepDurationUp: 1
  },
  {
    id: "demo2-reverse-engineering", frame: 304, component: "ReverseEngineeringCard",
    enter: { animation: "zoom-out", from: 296, to: 304 },
    exit: { animation: "zoom-in", from: 306, to: 310 },
    stepDurationDown: 0.7,
    stepDurationUp: 0.7
  },
  {
    id: "demo2-food", frame: 388, component: "FoodCard",
    enter: { animation: "zoom-out", from: 380, to: 388 },
    exit: { animation: "zoom-in", from: 388, to: 388 },
    stepDurationDown: 2.3,
    stepDurationUp: 2
  }
]

const componentMap = {
  ArtsCard,
  HeroContent2,
  ClassroomCard,
  SchoolFront2,
  EarlyDevelopmentCard,
  FoodCard,
  InnovationLabsCard,
  ReverseEngineeringCard
}

export default function HerotoFull() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { activeIndex, currentFrame, scrollToIndex } = useStrictSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount,
    frameSrc,
    anchors,
  })
  const contentAnchors = anchors.filter((anchor) => anchor.component)
  const controlsStartIndex = anchors.findIndex((anchor) => anchor.id === "demo2-schoolfront")
  const showJourneyNav = controlsStartIndex >= 0 && activeIndex >= controlsStartIndex
  const journeyItems = anchors.slice(Math.max(controlsStartIndex, 0)).map((anchor, index) => ({
    id: anchor.id,
    order: String(index + 1).padStart(2, "0"),
  }))
  const journeyActiveIndex = Math.max(activeIndex - Math.max(controlsStartIndex, 0), 0)

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

      {showJourneyNav ? (
        <>
          <LearningJourneyProgressDemo2
            items={journeyItems}
            activeIndex={journeyActiveIndex}
            onSelect={(index) => scrollToIndex(controlsStartIndex + index)}
          />
          <LearningJourneyControlsDemo2
            onPrevious={() => scrollToIndex(activeIndex - 1)}
            onNext={() => scrollToIndex(activeIndex + 1)}
            previousDisabled={activeIndex <= controlsStartIndex}
            nextDisabled={activeIndex === anchors.length - 1}
          />
        </>
      ) : null}
    </section>
  )
}
