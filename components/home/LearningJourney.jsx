"use client"

import { useEffect, useRef, useState } from "react"
import { learningJourneyData } from "@/lib/learningJourney"

function IconMark({ icon }) {
  const labels = {
    screen: "SC",
    spark: "IN",
    message: "CM",
    activity: "SP",
    heart: "VC",
  }

  return (
    <span className="grid h-4 w-4 place-items-center rounded-[3px] border border-current text-[7px] font-black leading-none">
      {labels[icon] || "LJ"}
    </span>
  )
}

export default function LearningJourney() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const activeItem = learningJourneyData[activeIndex]

  useEffect(() => {
    let trigger
    let isMounted = true

    async function setupScrollTrigger() {
      if (!sectionRef.current || typeof window === "undefined") return

      const gsapModule = await import("gsap")
      const scrollTriggerModule = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.gsap || gsapModule.default
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      if (!isMounted || !sectionRef.current) return

      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            learningJourneyData.length - 1,
            Math.floor(self.progress * learningJourneyData.length)
          )

          setActiveIndex((currentIndex) =>
            currentIndex === nextIndex ? currentIndex : nextIndex
          )
        },
      })

      ScrollTrigger.refresh()
    }

    setupScrollTrigger()

    return () => {
      isMounted = false
      if (trigger) trigger.kill()
    }
  }, [])

  useEffect(() => {
    setVideoError(false)
  }, [activeItem.id])

  return (
    <section
      ref={sectionRef}
      className="relative h-[1200vh] bg-white text-[#111111]"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full  grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[45%_48%] md:items-center md:justify-between md:px-10 lg:px-16">
          <div className="flex min-h-[420px] flex-col  justify-center md:min-h-[560px]">
            <div
              key={activeItem.id}
              className="animate-[learningTextIn_650ms_ease_both]"
            >
              <div className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                <IconMark icon={activeItem.icon} />
                <span>{activeItem.eyebrow}</span>
              </div>

              <h2 className="max-w-[680px] text-[clamp(2.5rem,3.8vw,4.5rem)] text-display uppercase  tracking-normal text-neutral-950">
                {activeItem.title}
              </h2>

              <p className="mt-9 max-w-[470px] text-base font-medium leading-snug text-neutral-700 md:text-xl">
                {activeItem.description}
              </p>



              <div className="mt-12 flex flex-col  items-start ">
                <div className="flex gap-2 justify-center items-center">
                  <span
                    className={`rounded-md px-3 py-2 text-xl font-semibold leading-none ${activeItem.accentClass}`}
                  >
                    {activeItem.metric}
                  </span>
                  <span className=" font-semibold text-neutral-600">
                    {activeItem.metricLabel}
                  </span>
                </div>
                {/* <p className="text-xs text-neutral-400 mt-4">
                  {activeItem.metricResearch}
                </p> */}
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-[#344384] transition-all hover:text-white">
                Learn More
              </button>


            </div>
          </div>

          <div className="relative min-h-[360px] md:min-h-[560px]">
            <div
              key={activeItem.video || activeItem.img}
              className="h-full min-h-[360px] animate-[learningVideoIn_650ms_ease_both] overflow-hidden rounded-lg bg-[#cac8ad] mt-6 md:h-[80vh] border border-neutral-200"
            >
              {activeItem.video && !videoError ? (
                <video
                  className="h-full w-full object-cover"
                  src={activeItem.video}
                  onError={() => setVideoError(true)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  className="h-full w-full object-cover"
                  src={activeItem.img}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes learningTextIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes learningVideoIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
