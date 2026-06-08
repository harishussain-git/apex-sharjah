"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { PiCheckLight, PiImageSquareLight, PiXBold } from "react-icons/pi"

export default function FacilityCardDrawer({ data, open, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted || !open || !data) return null

  const drawerIntro = data.drawerIntro ?? data.intro
  const drawerPoints = data.drawerPoints ?? data.points ?? []
  const items = data.items ?? []

  return createPortal(
    <div
      className="fixed inset-0 z-[5000] bg-black/45 md:flex md:justify-end"
      onClick={onClose}
    >
      <aside
        data-lenis-prevent
        onClick={(event) => event.stopPropagation()}
        className="h-dvh w-full overflow-y-auto bg-white px-4 pb-8 pt-5 [-webkit-overflow-scrolling:touch] md:w-[46rem] md:max-w-[min(46rem,100vw)] md:px-8 md:pb-10 md:pt-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close facility details"
          className="sticky left-full top-0 z-10 ml-auto grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:bg-neutral-50"
        >
          <PiXBold className="text-lg" />
        </button>

        <div className="mt-2 rounded-[1.75rem] border border-neutral-200 bg-[#fcfcfc] p-5 md:p-7">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/72">
            <PiImageSquareLight className="text-black/80" />
            <span>{data.eyebrow}</span>
          </div>

          <h2 className="mt-4 max-w-[18ch] font-accent text-[2rem] font-semibold uppercase leading-[1.02] text-black md:text-[3.25rem]">
            {data.title}
          </h2>

          <div className="mt-5 grid gap-4 border-y border-neutral-200 py-5 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start">
            <p className="text-sm leading-6 text-[#4a5875] md:text-[0.98rem]">
              {drawerIntro}
            </p>

            <div className="rounded-2xl bg-[#eef4ff] p-4 text-black">
              <p className="text-2xl font-semibold leading-none md:text-[2rem]">
                {data.metric}
              </p>
              <p className="mt-2 text-sm leading-5 text-black/80">
                {data.metricLabel}
              </p>
            </div>
          </div>

          {drawerPoints.length ? (
            <ul className="mt-5 grid gap-3 text-sm text-[#2e3748] md:grid-cols-2">
              {drawerPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
                  <PiCheckLight className="mt-0.5 shrink-0 text-[1.1rem] text-[#123f8b]" />
                  <span className="leading-5">{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {items.length ? (
          <div className="mt-5 space-y-3">
            {items.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white md:grid md:grid-cols-[220px_minmax(0,1fr)]"
              >
                <div className="relative h-48 bg-neutral-100 md:h-full md:min-h-[200px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 220px, 100vw"
                  />
                </div>

                <div className="p-5 md:p-6">
                  <h3 className="font-accent text-[1.45rem] font-semibold uppercase leading-tight text-[var(--color-primary-500)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#55627e]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </aside>
    </div>
    ,
    document.body
  )
}
