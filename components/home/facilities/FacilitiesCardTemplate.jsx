"use client"

import { useState } from "react"
import {
  PiBaby,
  PiBarbell,
  PiBus,
  PiCheckLight,
  PiFlask,
  PiImageSquareLight,
  PiLeaf,
  PiLightbulb,
  PiMicrophoneStage,
  PiMonitor,
  PiMosque,
  PiPalette,
  PiShield,
  PiSoccerBall,
  PiWaves,
  PiWrench,
} from "react-icons/pi"
import FacilityCardDrawer from "./FacilityCardDrawer"
import FacilityCardDrawerTest from "./FacilityCardDrawerTest"

const facilityIcons = {
  "Smart Classrooms": PiMonitor,
  "Early Development": PiBaby,
  "Innovation Labs": PiLightbulb,
  "Arts & Creativity": PiPalette,
  "Indoor Sports": PiBarbell,
  "Martial Arts": PiShield,
  "Outdoor Sports": PiSoccerBall,
  "Swimming": PiWaves,
  "Reverse Engineering": PiWrench,
  "Food Science": PiFlask,
  "Islamic Garden & Nature": PiLeaf,
  "Prayer / Masjid": PiMosque,
  "Personality Development": PiMicrophoneStage,
  "Smart Transport & Safe Connectivity": PiBus,
}

export default function FacilitiesCardTemplate({ data }) {
  const [open, setOpen] = useState(false)
  const [showTest, setShowTest] = useState(false)

  if (!data) return null

  const FacilityIcon = facilityIcons[data.eyebrow] ?? PiImageSquareLight

  return (
    <>
      <div className="relative h-full w-full px-4">
        {/* Desktop card: full content, hidden on mobile so positioning stays independent. */}
        <article className="hidden w-full rounded-[1.75rem] border border-white/45 bg-white/65 shadow-[0_18px_50px_rgba(44,61,98,0.14),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl backdrop-saturate-150 md:ml-4 md:mt-24 md:block md:w-[20rem]">
          <div className="rounded-[1.4rem] bg-white/5 p-4 text-[#141414]">
            <div className="flex items-center gap-3 text-[clamp(0.4rem,1vw+0.5rem,0.6rem)] font-semibold uppercase tracking-[0.14em] text-black/72">
              <FacilityIcon aria-hidden="true" className="shrink-0 text-base text-black/80" />
              <span>{data.eyebrow}</span>
            </div>

            <h2 className="mt-3 max-w-[30ch] font-accent text-[clamp(1.5rem,1vw+1rem,2.1rem)] font-bold uppercase leading-[1.1] tracking-tight text-black">
              {data.title}
            </h2>

            <div className="my-3 h-px w-full bg-[#dddddd]" />

            <p className="leading-[1.28] text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] text-[#1f2d48]">
              {data.intro}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <p className="text-[1.1rem] font-semibold leading-none text-black">
                {data.metric}
              </p>
              <p className="text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] leading-[1.2] text-black/90">
                {data.metricLabel}
              </p>
            </div>

            <ul className="mt-4 space-y-2 text-[#0b1018]">
              {data.points?.map((point) => (
                <li key={point} className="flex items-center gap-2 text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] leading-[1.2]">
                  <PiCheckLight className="shrink-0 text-[1rem] text-[#0040ae]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              // onClick={() => setOpen(true)}
              className="mt-4 inline-flex rounded-xl bg-[#ffffff] px-5 py-2 text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] font-medium text-black transition-colors duration-300 hover:bg-[#f7f7ff] cursor-pointer"
            >
              {data.buttonText}
            </button>
{/* 
            <button
              type="button"
              onClick={() => setShowTest(true)}
              className="mt-4 inline-flex rounded-xl bg-[#dbe8fb] px-5 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#cdddf6] cursor-pointer"
            >
              Read More Test
            </button> */}
          </div>
        </article>

        {/* Mobile card: compact version for easier placement and less visual weight. */}
        <article className="absolute bottom-4 left-1/2 block w-full -translate-x-1/2 rounded-[1.4rem] border border-white/70 bg-white/72 p-2 shadow-[0_18px_50px_rgba(44,61,98,0.14)] backdrop-blur-xl md:hidden">
          <div className="rounded-[1.1rem] bg-[#fbfbfb]/96 p-4 text-[#141414]">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/72">
              <FacilityIcon aria-hidden="true" className="shrink-0 text-[1rem] text-black/80" />
              <span>{data.eyebrow}</span>
            </div>

            <h2 className="mt-4 max-w-[30ch] font-accent text-[clamp(1.5rem,1vw+1rem,2.5rem)] font-bold uppercase leading-[1.08] text-black">
              {data.title}
            </h2>

            <div className="my-4 h-px w-full bg-[#d9d9d9]" />

            <div className="flex items-center gap-2">
              <p className="text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] font-semibold leading-none text-black">
                {data.metric}
              </p>
              <p className="text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] leading-[1.2] text-black/90">
                {data.metricLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 inline-flex rounded-xl bg-[#dbe8fb] px-4 py-2 text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] font-medium text-black transition-colors duration-300 hover:bg-[#cdddf6] cursor-pointer"
            >
              {data.buttonText}
            </button>

            {/* <button
              type="button"
              onClick={() => setShowTest(true)}
              className="mt-4 inline-flex rounded-xl bg-[#dbe8fb] px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#cdddf6] cursor-pointer"
            >
              Read More Test
            </button> */}
          </div>
        </article>
      </div>

      <FacilityCardDrawer data={data} open={open} onClose={() => setOpen(false)} />
      <FacilityCardDrawerTest data={data} open={showTest} onClose={() => setShowTest(false)} />
    </>
  )
}
