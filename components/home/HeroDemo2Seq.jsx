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
    exit: { animation: "zoom-in", from: 1, to: 7 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "demo2-schoolfront", frame: 45, component: "SchoolFront2",
    enter: { animation: "zoom-out", from: 39, to: 45 },
    exit: { animation: "zoom-in", from: 45, to: 51 },
    stepDurationDown: 1.2,
    stepDurationUp: 1,
  },
  {
    id: "demo2-classroom", frame: 103, component: "ClassroomCard",
    enter: { animation: "zoom-out", from: 97, to: 103 },
    exit: { animation: "zoom-in", from: 103, to: 109 },
    stepDurationDown: 2,
    stepDurationUp: 0.5
  },
  {
    id: "demo2-early-development", frame: 134, component: "EarlyDevelopmentCard",
    enter: { animation: "zoom-out", from: 128, to: 134 },
    exit: { animation: "zoom-in", from: 134, to: 140 },
    stepDurationDown: 1,
    stepDurationUp: 1
  },
  {
    id: "demo2-innovation-labs", frame: 168, component: "InnovationLabsCard",
    enter: { animation: "zoom-out", from: 162, to: 168 },
    exit: { animation: "zoom-in", from: 168, to: 174 },
    stepDurationDown: 1.2,
    stepDurationUp: 3
  },
  {
    id: "demo2-arts", frame: 266, component: "ArtsCard",
    enter: { animation: "zoom-out", from: 260, to: 266 },
    exit: { animation: "zoom-in", from: 266, to: 272 },
    stepDurationDown: 4.5,
    stepDurationUp: 1
  },
  {
    id: "demo2-indoorplay", frame: 339, component: "IndoorPlayCard",
    enter: { animation: "zoom-out", from: 333, to: 339 },
    exit: { animation: "zoom-in", from: 339, to: 345 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.6
  },
  {
    id: "demo2-karate", frame: 389, component: "KaratePlayCard",
    enter: { animation: "zoom-out", from: 383, to: 389 },
    exit: { animation: "zoom-in", from: 389, to: 395 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.6
  },
  {
    id: "demo2-football", frame: 455, component: "FootballPlayCard",
    enter: { animation: "zoom-out", from: 449, to: 455 },
    exit: { animation: "zoom-in", from: 455, to: 461 },
    stepDurationDown: 2,
    stepDurationUp: 1.6
  },
  {
    id: "demo2-swim", frame: 546, component: "KidsPoolSwimmingCard",
    enter: { animation: "zoom-out", from: 540, to: 546 },
    exit: { animation: "zoom-in", from: 546, to: 552 },
    stepDurationDown: 3,
    stepDurationUp: 2.6
  },
  {
    id: "demo2-reverse-engineering", frame: 580, component: "ReverseEngineeringCard",
    enter: { animation: "zoom-out", from: 574, to: 580 },
    exit: { animation: "zoom-in", from: 580, to: 586 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.3
  },
  {
    id: "demo2-food", frame: 629, component: "FoodCard",
    enter: { animation: "zoom-out", from: 623, to: 629 },
    exit: { animation: "zoom-in", from: 629, to: 635 },
    stepDurationDown: 2.3,
    stepDurationUp: 2
  },
  {
    id: "demo2-garden", frame: 680, component: "IslamicGardenNatureLearningCard",
    enter: { animation: "zoom-out", from: 674, to: 680 },
    exit: { animation: "zoom-in", from: 680, to: 686 },
    stepDurationDown: 2.3,
    stepDurationUp: 2
  },
  {
    id: "demo2-masjid", frame: 725, component: "PrayerRoomMosqueCard",
    enter: { animation: "zoom-out", from: 719, to: 725 },
    exit: { animation: "zoom-in", from: 725, to: 731 },
    stepDurationDown: 2.3,
    stepDurationUp: 2
  },
  {
    id: "demo2-communication", frame: 761, component: "CommunicationCard",
    enter: { animation: "zoom-out", from: 755, to: 761 },
    exit: { animation: "zoom-in", from: 761, to: 767 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.6
  },
    {
    id: "demo2-home", frame: 867, component: "SmartTransportSafeConnectivityCard",
    enter: { animation: "zoom-out", from: 861, to: 867 },
    exit: { animation: "zoom-in", from: 867, to: 873 },
    stepDurationDown: 4,
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
  { id: "demo2-karate", label: facilities.karate.eyebrow },
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
