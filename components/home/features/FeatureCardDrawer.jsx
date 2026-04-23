"use client"

import { useEffect } from "react"
import Image from "next/image"
import { PiChalkboardTeacherDuotone } from "react-icons/pi"

export default function FeatureCardDrawer({ data, open, onClose }) {
  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    }

    window.__lenis?.stop?.()
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.width = previous.bodyWidth
      window.scrollTo(0, scrollY)
      window.__lenis?.start?.()
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[2000] overscroll-contain bg-black/35 md:flex md:justify-end">
      <aside
        data-lenis-prevent
        className="h-dvh w-full touch-pan-y overflow-y-auto overscroll-contain bg-white p-5 [-webkit-overflow-scrolling:touch] md:w-[58vw] md:max-w-4xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="fixed right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white shadow"
        >
          x
        </button>

        <p className="mb-6 flex items-center gap-2 text-eyebrow text-neutral-700">
          <PiChalkboardTeacherDuotone /> {data.eyebrow}
        </p>
        <h2 className="mb-4 font-accent text-3xl font-semibold uppercase leading-tight md:text-5xl">
          {data.title}
        </h2>
        <p className="mb-4 max-w-md text-body text-neutral-600">{data.intro}</p>
        <p className="text-2xl font-medium">{data.metric}</p>
        <p className="mb-6 text-sm">{data.metricLabel}</p>

        <div className="space-y-3">
          {data.items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="rounded-xl bg-neutral-50 p-2 md:grid md:grid-cols-[260px_1fr] md:gap-6 md:p-3"
            >
              <div className="relative h-40 overflow-hidden rounded-lg md:h-48">
                <Image src={item.image} alt="" fill className="object-cover" sizes="(min-width: 768px) 260px, 100vw" />
              </div>
              <div className="p-3">
                <h3 className="mb-2 font-accent text-2xl font-semibold text-[var(--color-primary-500)]">{item.title}</h3>
                <p className="text-body text-neutral-700">{item.text}</p>
                <button type="button" className="mt-5 rounded-lg bg-blue-100 px-4 py-2 text-sm">
                  View More
                </button>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </div>
  )
}
