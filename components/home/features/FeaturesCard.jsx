"use client"

import { useState } from "react"
import { PiChalkboardTeacherDuotone, PiCheckBold } from "react-icons/pi"
import features from "../../../content/features.json"
import FeatureCardDrawer from "./FeatureCardDrawer"

export default function FeaturesCard({ data }) {
  const card = data ?? features.school
  const [open, setOpen] = useState(false)

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="mx-2 cursor-pointer rounded-xl bg-white/85 p-1.5 shadow-xl backdrop-blur-md md:mx-0 md:w-[380px]"
      >
        <p className="my-2 flex items-center gap-2 pl-3 text-eyebrow text-neutral-700">
          <PiChalkboardTeacherDuotone className="text-xl" /> {card.eyebrow}
        </p>

        <div className="rounded-md bg-white p-3 md:p-4">
          <h2 className="hidden font-accent text-2xl font-semibold uppercase leading-tight tracking-normal md:block">
            {card.title}
          </h2>
          <div className="my-4 hidden h-px bg-neutral-200 md:block" />
          <p className="text-caption text-neutral-900">{card.intro}</p>

          <div className="mt-4 flex items-center gap-3">
            <p className="w-fit rounded-md bg-blue-100 px-3 py-2 text-xl font-medium">{card.metric}</p>
            <p className="text-caption">{card.metricLabel}</p>
          </div>

          <ul className="mt-4 hidden space-y-2 text-sm text-neutral-500 md:block">
            {card.points.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <PiCheckBold className="text-neutral-600" />
                {point}
              </li>
            ))}
          </ul>

          <button type="button" className="mt-4 hidden rounded-lg bg-blue-100 px-4 py-2 text-sm md:block">
            Read more
          </button>
        </div>
      </article>

      <FeatureCardDrawer data={card} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
