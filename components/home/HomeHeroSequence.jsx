"use client"

import { useRef } from "react"
import facilities from "../../content/facilities.json"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"
import {
  HOME_FRAME_COUNT,
  HOME_INITIAL_FRAME_COUNT,
  homeFrameSrc,
} from "../../lib/homeSequence"
import CampusIntro from "./CampusIntro"
import FacilityCard from "./facilities/FacilityCard"
import FacilityControls from "./facilities/FacilityControls"
import FacilityProgress from "./facilities/FacilityProgress"
import HomeHeroContent from "./HomeHeroContent"

// Step durations control how long scrolling takes between two anchor frames.
// Larger values make that part of the journey slower.
const anchors = [
  {
    id: "home-hero",
    frame: 1,
    component: HomeHeroContent,
    enter: { animation: "zoom-out", from: 1, to: 1 },
    exit: { animation: "zoom-in", from: 1, to: 6 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "home-campus",
    frame: 40,
    component: CampusIntro,
    enter: { animation: "zoom-out", from: 35, to: 40 },
    exit: { animation: "zoom-in", from: 40, to: 45 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "home-classroom",
    frame: 71,
    facilityKey: "classroom",
    enter: { animation: "zoom-out", from: 66, to: 71 },
    exit: { animation: "zoom-in", from: 71, to: 76 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "home-early-development",
    frame: 100,
    facilityKey: "earlyDevelopment",
    enter: { animation: "zoom-out", from: 95, to: 100 },
    exit: { animation: "zoom-in", from: 100, to: 105 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "home-innovation-labs",
    frame: 137,
    facilityKey: "innovationLabs",
    enter: { animation: "zoom-out", from: 132, to: 137 },
    exit: { animation: "zoom-in", from: 137, to: 142 },
    stepDurationDown: 1.2,
    stepDurationUp: 3,
  },
  {
    id: "home-arts",
    frame: 266,
    facilityKey: "arts",
    enter: { animation: "zoom-out", from: 261, to: 266 },
    exit: { animation: "zoom-in", from: 266, to: 271 },
    stepDurationDown: 4.5,
    stepDurationUp: 1,
  },
  {
    id: "home-indoor-sports",
    frame: 302,
    facilityKey: "indoorSportsHall",
    enter: { animation: "zoom-out", from: 297, to: 302 },
    exit: { animation: "zoom-in", from: 302, to: 307 },
    stepDurationDown: 1.6,
    stepDurationUp: 1.6,
  },
  {
    id: "home-football",
    frame: 326,
    facilityKey: "football",
    enter: { animation: "zoom-out", from: 321, to: 326 },
    exit: { animation: "zoom-in", from: 326, to: 331 },
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  {
    id: "home-swimming",
    frame: 403,
    facilityKey: "kidsPoolSwimming",
    enter: { animation: "zoom-out", from: 398, to: 403 },
    exit: { animation: "zoom-in", from: 403, to: 408 },
    stepDurationDown: 2,
    stepDurationUp: 1,
  },
  {
    id: "home-reverse-engineering",
    frame: 421,
    facilityKey: "reverseEngineering",
    enter: { animation: "zoom-out", from: 416, to: 421 },
    exit: { animation: "zoom-in", from: 421, to: 426 },
    stepDurationDown: 1,
    stepDurationUp: 1.3,
  },
  {
    id: "home-food",
    frame: 465,
    facilityKey: "food",
    enter: { animation: "zoom-out", from: 460, to: 465 },
    exit: { animation: "zoom-in", from: 465, to: 470 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.7,
  },
  {
    id: "home-garden",
    frame: 516,
    facilityKey: "islamicGardenNatureLearning",
    enter: { animation: "zoom-out", from: 511, to: 516 },
    exit: { animation: "zoom-in", from: 516, to: 521 },
    stepDurationDown: 2,
    stepDurationUp: 2,
  },
  {
    id: "home-prayer-room",
    frame: 561,
    facilityKey: "prayerRoomMosque",
    enter: { animation: "zoom-out", from: 556, to: 561 },
    exit: { animation: "zoom-in", from: 561, to: 566 },
    stepDurationDown: 2.3,
    stepDurationUp: 1.1,
  },
  {
    id: "home-auditorium",
    frame: 597,
    facilityKey: "auditoriumHall",
    enter: { animation: "zoom-out", from: 592, to: 597 },
    exit: { animation: "zoom-in", from: 597, to: 602 },
    stepDurationDown: 1.6,
    stepDurationUp: 2,
  },
  {
    id: "home-transport",
    frame: 703,
    facilityKey: "smartTransportSafeConnectivity",
    enter: { animation: "zoom-out", from: 698, to: 703 },
    exit: { animation: "zoom-in", from: 703, to: 703 },
    stepDurationDown: 4.5,
    stepDurationUp: 3,
  },
]

const facilityAnchors = anchors.filter((anchor) => anchor.facilityKey)
const journeyItems = facilityAnchors.map((anchor) => ({
  id: anchor.id,
  label: facilities[anchor.facilityKey].eyebrow,
}))

export default function HomeHeroSequence() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { activeIndex, currentFrame, scrollToIndex } = useStrictSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount: HOME_FRAME_COUNT,
    frameSrc: homeFrameSrc,
    anchors,
    options: {
      priorityCount: HOME_INITIAL_FRAME_COUNT,
    },
  })

  const controlsStartIndex = anchors.indexOf(facilityAnchors[0])
  const controlsEndIndex = anchors.indexOf(facilityAnchors.at(-1))
  const showJourneyNav = currentFrame >= anchors[controlsStartIndex].frame
  const journeyActiveIndex = Math.min(
    Math.max(activeIndex - controlsStartIndex, 0),
    journeyItems.length - 1,
  )

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {anchors.map((anchor, index) => {
        const Content = anchor.component
        const isActive = activeIndex === index

        return (
          <div
            key={anchor.id}
            aria-hidden={!isActive}
            inert={!isActive}
            className="absolute inset-0 z-10"
            style={getSequenceLayerStyle(anchor, currentFrame)}
          >
            {anchor.facilityKey ? (
              <FacilityCard data={facilities[anchor.facilityKey]} />
            ) : (
              <Content />
            )}
          </div>
        )
      })}

      {showJourneyNav ? (
        <>
          <FacilityProgress
            items={journeyItems}
            activeIndex={journeyActiveIndex}
            onSelect={(index) => scrollToIndex(controlsStartIndex + index)}
          />
          <FacilityControls
            onPrevious={() => scrollToIndex(activeIndex - 1)}
            onNext={() => scrollToIndex(Math.min(controlsEndIndex, activeIndex + 1))}
            previousDisabled={activeIndex <= controlsStartIndex}
            nextDisabled={activeIndex >= controlsEndIndex}
          />
        </>
      ) : null}
    </section>
  )
}
