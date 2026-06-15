"use client"

import {
  PiBaby,
  PiBarbell,
  PiBus,
  PiFlask,
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

const journeyItems = [
  { title: "Smart Classrooms", icon: PiMonitor },
  { title: "Early Development", icon: PiBaby },
  { title: "Innovation Labs", icon: PiLightbulb },
  { title: "Arts & Creativity", icon: PiPalette },
  { title: "Indoor Sports Hall", icon: PiBarbell },
  { title: "Karate Training", icon: PiShield },
  { title: "Football Ground", icon: PiSoccerBall },
  { title: "Kids' Pool & Swimming Pool", icon: PiWaves },
  { title: "Reverse Engineering", icon: PiWrench },
  { title: "Food Science", icon: PiFlask },
  { title: "Islamic Garden & Nature Learning", icon: PiLeaf },
  { title: "Prayer Room / Mosque", icon: PiMosque },
  { title: "Auditorium Hall", icon: PiMicrophoneStage },
  { title: "Smart Transport & Safe Connectivity", icon: PiBus },
]

export default function LearningJourneyProgressDemo2({
  items,
  activeIndex,
  onSelect,
}) {
  const total = Math.max(items.length - 1, 1)
  const progress = (activeIndex / total) * 100
  const displayItems = items.map((item, index) => ({
    ...item,
    ...journeyItems[index],
    title: journeyItems[index]?.title ?? item.label,
  }))

  return (
    <div className="right-10 top-1/2 z-[850] hidden h-fit -translate-y-1/2 items-center gap-3 rounded-lg bg-white/50 px-3 py-4 backdrop-blur-md md:fixed md:flex">
      <div className="flex h-[440px] gap-1 h-full flex-col justify-between">
        {displayItems.map((item, index) => {
          const isActive = activeIndex === index
          const Icon = item.icon ?? PiMonitor
          const tooltipId = `journey-tooltip-${item.id}`

          return (
            <div key={item.id} className="group relative">
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`peer grid size-8 cursor-pointer place-items-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19357a]/45 focus-visible:ring-offset-2 ${
                  isActive
                    ? "scale-110 border-[#19357a] bg-[#19357a] text-white shadow-[0_5px_16px_rgba(15,30,117,0.28)]"
                    : "border-[#19357a]/15 bg-white/55 text-[#26345e]/65 hover:border-[#19357a]/35 hover:bg-white hover:text-[#19357a]"
                }`}
                aria-label={`Go to ${item.title}`}
                aria-describedby={tooltipId}
                aria-current={isActive ? "step" : undefined}
              >
                <Icon aria-hidden="true" className="size-4" />
              </button>

              <span
                id={tooltipId}
                role="tooltip"
                className={`pointer-events-none absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#071839]/92 px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_rgba(3,15,40,0.24)] backdrop-blur-md transition-all delay-100 duration-200 ease-out group-hover:delay-0 peer-focus-visible:delay-0 ${
                  isActive
                    ? "translate-x-0 opacity-100"
                    : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 peer-focus-visible:translate-x-0 peer-focus-visible:opacity-100"
                }`}
              >
                {item.title}
              </span>
            </div>
          )
        })}
      </div>

      <div className="relative h-[490px] w-px bg-[#344384]/18">
        <span
          className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#344384] transition-all duration-500 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  )
}
