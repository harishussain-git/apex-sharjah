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

function CardContent({ data, FacilityIcon, onReadMore, compact = false }) {
  return (
    <div className={` ${compact ? "max-w-full" : "max-w-[20rem]"}`}>
           <div className="flex items-center gap-3 text-[clamp(0.4rem,1vw+0.5rem,0.6rem)] font-semibold uppercase tracking-[0.14em] text-black/72">
              <FacilityIcon aria-hidden="true" className="shrink-0 text-base text-black/80" />
              <span>{data.eyebrow}</span>
            </div>

      <h2 className="mt-2 max-w-[30ch] font-accent text-[clamp(1.5rem,1vw+1rem,2.1rem)] font-bold uppercase leading-[1.1]  text-black">
        {data.title}
      </h2>

      <div className="my-3 h-[2px] w-16 rounded-full bg-[#8dc0ff]" />

      <p className="leading-[1.28] text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] text-[#1f2d48]">
        {data.intro}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <p className="text-[clamp(0.8rem,1vw+0.6rem,1rem)] font-semibold leading-none text-black">
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
        className="mt-4 inline-flex rounded-xl bg-[#364284] px-4 py-2 text-[clamp(0.6rem,1vw+0.5rem,0.8rem)] font-medium text-white transition-colors duration-300 hover:bg-[#4655a9] cursor-pointer"
      >
        {data.buttonText}
      </button>
    </div>
  )
}

export default function FacilitiesCardTemplate2({ data }) {
  const [open, setOpen] = useState(false)
  const [showTest, setShowTest] = useState(false)

  if (!data) return null

  const FacilityIcon = facilityIcons[data.eyebrow] ?? PiImageSquareLight

  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        <div className="hidden md:absolute md:inset-y-0 md:left-0 md:block md:w-[48%] bg-[radial-gradient(circle_at_10%_55%,white,rgba(255,255,255,0.4))] blur-2xl h-[90vh] " />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/18 to-transparent md:hidden" />

        <div className="relative z-10 flex h-full items-end md:items-stretch">
          <article className="w-full p-4 sm:p-6 md:flex md:p-8 lg:p-10 md:mt-16 ">
            <div className="w-full md:max-w-[24rem] ">
              <CardContent
                data={data}
                FacilityIcon={FacilityIcon}
                onReadMore={() => setOpen(true)}
                compact
              />
            </div>
          </article>
        </div>
      </div>

      <FacilityCardDrawer data={data} open={open} onClose={() => setOpen(false)} />
      <FacilityCardDrawerTest data={data} open={showTest} onClose={() => setShowTest(false)} />
    </>
  )
}
