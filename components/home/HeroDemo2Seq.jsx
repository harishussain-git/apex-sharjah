"use client"

import { useRef } from "react"
import facilities from "../../content/facilities.json"
import HeroContent2 from "./HeroContent2"
import ArtsCard from "./facilities/ArtsCard"
import ClassroomCard from "./facilities/ClassroomCard"
import CommunicationCard from "./facilities/CommunicationCard"
import EarlyDevelopmentCard from "./facilities/EarlyDevelopmentCard"
import FoodCard from "./facilities/FoodCard"
import IndoorPlayCard from "./facilities/IndoorPlayCard"
import InnovationLabsCard from "./facilities/InnovationLabsCard"
import ReverseEngineeringCard from "./facilities/ReverseEngineeringCard"
import SchoolFront2 from "./SchoolFront2"
import LearningJourneyControlsDemo2 from "../ui/LearningJourneyControlsDemo2"
import LearningJourneyProgressDemo2 from "../ui/LearningJourneyProgressDemo2"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"
import { DEMO2_FRAME_COUNT, demo2FrameSrc } from "../../lib/demo2Sequence"

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
    stepDurationUp: 1
  },
  {
    id: "demo2-innovation-labs", frame: 168, component: "InnovationLabsCard",
    enter: { animation: "zoom-out", from: 160, to: 168 },
    exit: { animation: "zoom-in", from: 170, to: 175 },
    stepDurationDown: 1.2,
    stepDurationUp: 3
  },
  {
    id: "demo2-arts", frame: 266, component: "ArtsCard",
    enter: { animation: "zoom-out", from: 260, to: 266 },
    exit: { animation: "zoom-in", from: 268, to: 273 },
    stepDurationDown: 4.5,
    stepDurationUp: 1
  },
  {
    id: "demo2-reverse-engineering", frame: 304, component: "ReverseEngineeringCard",
    enter: { animation: "zoom-out", from: 296, to: 304 },
    exit: { animation: "zoom-in", from: 306, to: 310 },
    stepDurationDown: 0.7,
    stepDurationUp: 1.3
  },
  {
    id: "demo2-food", frame: 389, component: "FoodCard",
    enter: { animation: "zoom-out", from: 380, to: 388 },
    exit: { animation: "zoom-in", from: 392, to: 399 },
    stepDurationDown: 2.3,
    stepDurationUp: 2
  },
  {
    id: "demo2-communication", frame: 455, component: "CommunicationCard",
    enter: { animation: "zoom-out", from: 450, to: 455 },
    exit: { animation: "zoom-in", from: 459, to: 465 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.6
  },
    {
    id: "demo2-indoorplay", frame: 528, component: "indoorPlayCard",
    enter: { animation: "zoom-out", from: 522, to: 528 },
    exit: { animation: "zoom-in", from: 528, to: 533 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.6
  }
]

const componentMap = {
  ArtsCard,
  HeroContent2,
  ClassroomCard,
  CommunicationCard,
  SchoolFront2,
  EarlyDevelopmentCard,
  FoodCard,
  indoorPlayCard: IndoorPlayCard,
  InnovationLabsCard,
  ReverseEngineeringCard
}

const journeySteps = [
  { id: "demo2-classroom", label: facilities.classroom.eyebrow },
  { id: "demo2-early-development", label: facilities.earlyDevelopment.eyebrow },
  { id: "demo2-innovation-labs", label: facilities.innovationLabs.eyebrow },
  { id: "demo2-arts", label: facilities.arts.eyebrow },
  { id: "demo2-reverse-engineering", label: facilities.reverseEngineering.eyebrow },
  { id: "demo2-food", label: facilities.food.eyebrow },
  { id: "demo2-communication", label: facilities.auditoriumHall.eyebrow },
  { id: "demo2-indoorplay", label: facilities.indoorSportsHall.eyebrow },
]

export default function HerotoFull() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { activeIndex, currentFrame, scrollToIndex } = useStrictSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount: DEMO2_FRAME_COUNT,
    frameSrc: demo2FrameSrc,
    anchors,
  })
  const contentAnchors = anchors.filter((anchor) => anchor.component)
  const controlsStartIndex = anchors.findIndex((anchor) => anchor.id === "demo2-classroom")
  const controlsEndIndex = anchors.findIndex((anchor) => anchor.id === "demo2-indoorplay")
  const controlsStartFrame =
    controlsStartIndex >= 0 ? anchors[controlsStartIndex].frame : Number.POSITIVE_INFINITY
  const showJourneyNav = currentFrame >= controlsStartFrame
  const lastJourneyIndex = controlsEndIndex >= 0 ? controlsEndIndex : anchors.length - 1
  const journeyItems = journeySteps
  const journeyActiveIndex = Math.min(
    Math.max(activeIndex - Math.max(controlsStartIndex, 0), 0),
    Math.max(journeyItems.length - 1, 0),
  )

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
            onNext={() => scrollToIndex(Math.min(lastJourneyIndex, activeIndex + 1))}
            previousDisabled={activeIndex <= controlsStartIndex}
            nextDisabled={activeIndex >= lastJourneyIndex}
          />
        </>
      ) : null}
    </section>
  )
}
