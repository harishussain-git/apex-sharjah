"use client"

import { useRef } from "react"
import DebugPanel from "../../../lib/DebugPanel"
import { getSequenceLayerStyle } from "../../../lib/gsap/sequenceContentAnimation"
import { useSimpleSequenceScroll } from "../../../lib/gsap/SimpleSequenceScroll"
import SchoolFront from "../SchoolFront"

const frameCount = 136
const frameSrc = (frame) => `/sequences/new/white-bus/${String(frame).padStart(4, "0")}.webp`

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
  const { currentFrame, progress, activeAnchor } = useSimpleSequenceScroll({
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
      <DebugPanel
        label="Cloud Bus"
        currentFrame={currentFrame}
        frameCount={frameCount}
        progress={progress}
        activeAnchor={activeAnchor}
      />
      {anchors
        .filter((anchor) => anchor.component)
        .map((anchor) => {
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
