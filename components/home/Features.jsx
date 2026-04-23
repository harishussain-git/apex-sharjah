"use client"

import { useRef } from "react"

import Classroom from "./features/Classroom"
import Educraft from "./features/Educraft"
import Karate from "./features/Karate"
import School from "./features/School"
import Sports from "./features/Sports"
import { useSequenceScroll } from "../../lib/sequence/useSequenceScroll"

const frameCount = 117

const anchors = [
  { id: "school", frame: 1, component: "school" },
  { id: "classroom", frame: 117, component: "classroom" },
  // { id: "educraft", frame: 117, component: "educraft" },
  // { id: "karate", frame: 117, component: "karate" },
  // { id: "sports", frame: 117, component: "sports" },
]

const frameSrc = (frame) => `/sequences/new/hero-white/${String(frame).padStart(4, "0")}.webp`

const componentMap = {
  school: School,
  classroom: Classroom,
  educraft: Educraft,
  karate: Karate,
  sports: Sports,
}

export default function Features() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const { activeIndex, activeAnchor, debug } = useSequenceScroll({
    sectionRef,
    canvasRef,
    frameCount,
    frameSrc,
    anchors,
  })
  const ActiveContent = componentMap[activeAnchor?.component] ?? School

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden overscroll-none bg-[#f5efe7] text-neutral-950"
    >
      <div className="relative h-[100vh] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.24),transparent_62%)]" />

        <div className="relative z-10 flex h-full items-center px-8 md:px-16">
          <div className="grid w-full max-w-4xl gap-10 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
            <div className="flex flex-col gap-5">
              {anchors.map((item, index) => {
                const isActive = index === activeIndex

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span
                      className={`block rounded-full bg-neutral-950 transition-all duration-300 ${
                        isActive ? "h-[4px] w-16" : "h-px w-8 opacity-70"
                      }`}
                    />
                    <span
                      className={`text-base transition-opacity duration-300 md:text-2xl ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.id}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="max-w-xl">
              <ActiveContent />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-xl bg-black/75 px-3 py-2 font-mono text-[10px] leading-5 text-white md:right-5 md:top-5 md:text-xs">
          <div>active: {debug.activeIndex}</div>
          <div>anchor: {debug.activeId}</div>
          <div>frame: {debug.currentFrame}</div>
          <div>target: {debug.targetFrame}</div>
          <div>pinned: {String(debug.pinned)}</div>
          <div>locked: {String(debug.locked)}</div>
          <div>input: {debug.lastInput}</div>
          <div>wheel: {debug.wheelProgress}</div>
          <div>touch: {debug.touchProgress}</div>
        </div>
      </div>
    </section>
  )
}
