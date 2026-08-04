"use client"

import { useRef } from "react"
import facilities from "../../content/facilities.json"
import HeroContent2 from "./HeroContent2"
import ArtsCard from "./facilities/ArtsCard"
import ClassroomCard from "./facilities/ClassroomCard"
import CommunicationCard from "./facilities/CommunicationCard"
import EarlyDevelopmentCard from "./facilities/EarlyDevelopmentCard"
import FootballPlayCard from "./facilities/FootballPlayCard"
import FoodCard from "./facilities/FoodCard"
import IslamicGardenNatureLearningCard from "./facilities/IslamicGardenNatureLearningCard"
import IndoorPlayCard from "./facilities/IndoorPlayCard"
import InnovationLabsCard from "./facilities/InnovationLabsCard"
import KaratePlayCard from "./facilities/KaratePlayCard"
import KidsPoolSwimmingCard from "./facilities/KidsPoolSwimmingCard"
import PrayerRoomMosqueCard from "./facilities/PrayerRoomMosqueCard"
import ReverseEngineeringCard from "./facilities/ReverseEngineeringCard"
import SmartTransportSafeConnectivityCard from "./facilities/SmartTransportSafeConnectivityCard"
import SchoolFront2 from "./SchoolFront2"
import LearningJourneyControlsDemo2 from "../ui/LearningJourneyControlsDemo2"
import LearningJourneyProgressDemo2 from "../ui/LearningJourneyProgressDemo2"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"
import {
  DEMO2_FRAME_COUNT,
  DEMO2_INITIAL_FRAME_COUNT,
  demo2FrameSrc,
} from "../../lib/demo2Sequence"

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
    exit: { animation: "zoom-in", from: 1, to: 6 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "demo2-schoolfront", frame: 40, component: "SchoolFront2",
    enter: { animation: "zoom-out", from: 35, to: 40 },
    exit: { animation: "zoom-in", from: 40, to: 45 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "demo2-classroom", frame: 71, component: "ClassroomCard",
    enter: { animation: "zoom-out", from: 66, to: 71 },
    exit: { animation: "zoom-in", from: 71, to: 76 },
    stepDurationDown: 1,
    stepDurationUp: 1
  },
  {
    id: "demo2-early-development", frame: 100, component: "EarlyDevelopmentCard",
    enter: { animation: "zoom-out", from: 95, to: 100 },
    exit: { animation: "zoom-in", from: 100, to: 105 },
    stepDurationDown: 1,
    stepDurationUp: 1
  },
  {
    id: "demo2-innovation-labs", frame: 137, component: "InnovationLabsCard",
    enter: { animation: "zoom-out", from: 132, to: 137 },
    exit: { animation: "zoom-in", from: 137, to: 142 },
    stepDurationDown: 1.2,
    stepDurationUp: 3
  },
  {
    id: "demo2-arts", frame: 266, component: "ArtsCard",
    enter: { animation: "zoom-out", from: 261, to: 266 },
    exit: { animation: "zoom-in", from: 266, to: 271 },
    stepDurationDown: 4.5,
    stepDurationUp: 1
  },
  {
    id: "demo2-indoorplay", frame: 302, component: "IndoorPlayCard",
    enter: { animation: "zoom-out", from: 297, to: 302 },
    exit: { animation: "zoom-in", from: 302, to: 307 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.6
  },
  {
    id: "demo2-football", frame: 326, component: "FootballPlayCard",
    enter: { animation: "zoom-out", from: 321, to: 326 },
    exit: { animation: "zoom-in", from: 326, to: 331 },
    stepDurationDown: 1,
    stepDurationUp: 1
  },
  {
    id: "demo2-swim", frame: 403, component: "KidsPoolSwimmingCard",
    enter: { animation: "zoom-out", from: 398, to: 403 },
    exit: { animation: "zoom-in", from: 403, to: 408 },
    // down duration means. from previous to this step how long it takes.
    stepDurationDown: 2,
    stepDurationUp: 1
  },
  {
    id: "demo2-reverse-engineering", frame: 421, component: "ReverseEngineeringCard",
    enter: { animation: "zoom-out", from: 416, to: 421 },
    exit: { animation: "zoom-in", from: 421, to: 426 },
    stepDurationDown: 1,
    stepDurationUp: 1.3
  },
  {
    id: "demo2-food", frame: 465, component: "FoodCard",
    enter: { animation: "zoom-out", from: 460, to: 465 },
    exit: { animation: "zoom-in", from: 465, to: 470 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.7
  },
  {
    id: "demo2-garden", frame: 516, component: "IslamicGardenNatureLearningCard",
    enter: { animation: "zoom-out", from: 511, to: 516 },
    exit: { animation: "zoom-in", from: 516, to: 521 },
    stepDurationDown: 2,
    stepDurationUp: 2
  },
  {
    id: "demo2-masjid", frame: 561, component: "PrayerRoomMosqueCard",
    enter: { animation: "zoom-out", from: 556, to: 561 },
    exit: { animation: "zoom-in", from: 561, to: 566 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.1
  },
  {
    id: "demo2-communication", frame: 597, component: "CommunicationCard",
    enter: { animation: "zoom-out", from: 592, to: 597 },
    exit: { animation: "zoom-in", from: 597, to: 602 },
    stepDurationDown: 1.6,
    stepDurationUp: 2
  },
    {
    id: "demo2-home", frame: 703, component: "SmartTransportSafeConnectivityCard",
    enter: { animation: "zoom-out", from: 698, to: 703 },
    exit: { animation: "zoom-in", from: 703, to: 703 },
    stepDurationDown: 4.5,
    stepDurationUp: 3
  },

]

const componentMap = {
  ArtsCard,
  HeroContent2,
  ClassroomCard,
  CommunicationCard,
  FootballPlayCard,
  FoodCard,
  IslamicGardenNatureLearningCard,
  IndoorPlayCard,
  InnovationLabsCard,
  KaratePlayCard,
  KidsPoolSwimmingCard,
  PrayerRoomMosqueCard,
  ReverseEngineeringCard,
  SchoolFront2,
  EarlyDevelopmentCard,
  SmartTransportSafeConnectivityCard,
}

const journeySteps = [
  { id: "demo2-classroom", label: facilities.classroom.eyebrow },
  { id: "demo2-early-development", label: facilities.earlyDevelopment.eyebrow },
  { id: "demo2-innovation-labs", label: facilities.innovationLabs.eyebrow },
  { id: "demo2-arts", label: facilities.arts.eyebrow },
  { id: "demo2-indoorplay", label: facilities.indoorSportsHall.eyebrow },
  { id: "demo2-football", label: facilities.football.eyebrow },
  { id: "demo2-swim", label: facilities.kidsPoolSwimming.eyebrow },
  { id: "demo2-reverse-engineering", label: facilities.reverseEngineering.eyebrow },
  { id: "demo2-food", label: facilities.food.eyebrow },
  { id: "demo2-garden", label: facilities.islamicGardenNatureLearning.eyebrow },
  { id: "demo2-masjid", label: facilities.prayerRoomMosque.eyebrow },
  { id: "demo2-communication", label: facilities.auditoriumHall.eyebrow },
  { id: "demo2-home", label: facilities.smartTransportSafeConnectivity.eyebrow },
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
    options: {
      priorityCount: DEMO2_INITIAL_FRAME_COUNT,
    },
  })
  const contentAnchors = anchors.filter((anchor) => anchor.component)
  const controlsStartIndex = anchors.findIndex((anchor) => anchor.id === "demo2-classroom")
  const controlsEndIndex = anchors.findIndex((anchor) => anchor.id === "demo2-home")
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
            className="absolute inset-0 z-10"
            style={getSequenceLayerStyle(anchor, currentFrame)}
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
