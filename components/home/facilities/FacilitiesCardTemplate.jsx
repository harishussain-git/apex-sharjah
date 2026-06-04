"use client"

import { PiCheckLight, PiImageSquareLight } from "react-icons/pi"

export default function FacilitiesCardTemplate({ data }) {
  if (!data) return null

  return (
    <div className="relative h-full w-full px-4">
      {/* Desktop card: full content, hidden on mobile so positioning stays independent. */}
      <article className="hidden w-full rounded-[1.75rem] border border-white/70 bg-white/80 p-2 shadow-[0_18px_50px_rgba(44,61,98,0.14)] backdrop-blur-xl md:ml-4 md:mt-24 md:block md:w-[26rem]">
        <div className="rounded-[1.4rem] bg-[#fbfbfb]/96 p-6 text-[#141414]">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/72">
            <PiImageSquareLight className="text-black/80" />
            <span>{data.eyebrow}</span>
          </div>

          <h2 className="mt-5 max-w-[30ch] font-accent text-[clamp(1rem,1.5vw+1rem,2rem)] font-semibold uppercase leading-[1.1] tracking-tight text-black">
            {data.title}
          </h2>

          <div className="my-4 h-px w-full bg-[#d9d9d9]" />

          <p className="leading-[1.28] text-[#4a5875]">
            {data.intro}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <p className="text-[1.1rem] font-semibold leading-none text-black">
              {data.metric}
            </p>
            <p className="text-base leading-[1.2] text-black/90">
              {data.metricLabel}
            </p>
          </div>

          <ul className="mt-7 space-y-3 text-[#2e3748]">
            {data.points?.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm leading-[1.2]">
                <PiCheckLight className="shrink-0 text-[1.2rem] text-[#123f8b]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <a
            href={data.buttonLink}
            className="mt-4 inline-flex rounded-xl bg-[#dbe8fb] px-5 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#cdddf6]"
          >
            {data.buttonText}
          </a>
        </div>
      </article>

      {/* Mobile card: compact version for easier placement and less visual weight. */}
      <article className="block w-full rounded-[1.4rem] border border-white/70 bg-white/72 p-2 shadow-[0_18px_50px_rgba(44,61,98,0.14)] backdrop-blur-xl md:hidden absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="rounded-[1.1rem] bg-[#fbfbfb]/96 p-4 text-[#141414]">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/72">
            <PiImageSquareLight className="text-[1rem] text-black/80" />
            <span>{data.eyebrow}</span>
          </div>

          <h2 className="mt-4 max-w-[30ch] font-accent text-[1.5rem] font-semibold uppercase leading-[1.08] text-black">
            {data.title}
          </h2>

          <div className="my-4 h-px w-full bg-[#d9d9d9]" />

          <div className="flex items-center gap-2">
            <p className="text-base font-semibold leading-none text-black">
              {data.metric}
            </p>
            <p className="text-sm leading-[1.2] text-black/90">
              {data.metricLabel}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
