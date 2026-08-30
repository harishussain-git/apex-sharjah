"use client"

import { useRef } from "react"
import facilities from "../../content/facilities.json"
import { getSequenceLayerStyle } from "../../lib/gsap/sequenceContentAnimation"
import { useStrictSequenceScroll } from "../../lib/gsap/StrictSequenceScroll"
import {
  HOME_CONTENT_ANIMATION,
  HOME_FRAME_COUNT,
  HOME_INITIAL_FRAME_COUNT,
  HOME_SEQUENCE_SECTIONS,
  homeFrameSrc,
} from "../../lib/homeSequence"
import CampusIntro from "./CampusIntro"
import FacilityCard from "./facilities/FacilityCard"
import FacilityControls from "./facilities/FacilityControls"
import FacilityProgress from "./facilities/FacilityProgress"
import HomeHeroContent from "./HomeHeroContent"

// Section content and scroll speed stay editable here. Frame numbers are
// calculated automatically from the folders in the generated manifest.
const sectionContent = {
  "home-hero": {
    component: HomeHeroContent,
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  "home-campus": {
    component: CampusIntro,
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  "home-classroom": {
    facilityKey: "classroom",
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  "home-early-development": {
    facilityKey: "earlyDevelopment",
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  "home-innovation-labs": {
    facilityKey: "innovationLabs",
    stepDurationDown: 1.2,
    stepDurationUp: 3,
  },
  "home-arts": {
    facilityKey: "arts",
    stepDurationDown: 4.5,
    stepDurationUp: 1,
  },
  "home-indoor-sports": {
    facilityKey: "indoorSportsHall",
    stepDurationDown: 1.6,
    stepDurationUp: 1,
  },
  "home-football": {
    facilityKey: "football",
    stepDurationDown: 1,
    stepDurationUp: 1,
  },
  "home-swimming": {
    facilityKey: "kidsPoolSwimming",
    stepDurationDown: 1.5,
    stepDurationUp: 1,
  },
  "home-reverse-engineering": {
    facilityKey: "reverseEngineering",
    stepDurationDown: 1,
    stepDurationUp: 1.3,
  },
  "home-food": {
    facilityKey: "food",
    stepDurationDown: 2.3,
    stepDurationUp: 1.7,
  },
  "home-garden": {
    facilityKey: "islamicGardenNatureLearning",
    stepDurationDown: 2,
    stepDurationUp: 2,
  },
  "home-prayer-room": {
    facilityKey: "prayerRoomMosque",
    stepDurationDown: 2.3,
    stepDurationUp: 1.1,
  },
  "home-auditorium": {
    facilityKey: "auditoriumHall",
    stepDurationDown: 1.6,
    stepDurationUp: 2,
  },
  "home-transport": {
    facilityKey: "smartTransportSafeConnectivity",
    stepDurationDown: 4.5,
    stepDurationUp: 3,
  },
}

const anchors = HOME_SEQUENCE_SECTIONS.map(({ id, mainFrame }) => {
  const content = sectionContent[id]

  if (!content) {
    throw new Error(`Missing homepage content configuration for ${id}.`)
  }

  return {
    id,
    frame: mainFrame,
    ...content,
    enter: {
      animation: HOME_CONTENT_ANIMATION.enterAnimation,
      from: Math.max(1, mainFrame - HOME_CONTENT_ANIMATION.enterFrames),
      to: mainFrame,
    },
    exit: {
      animation: HOME_CONTENT_ANIMATION.exitAnimation,
      from: mainFrame,
      to: Math.min(
        HOME_FRAME_COUNT,
        mainFrame + HOME_CONTENT_ANIMATION.exitFrames,
      ),
    },
  }
})

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
