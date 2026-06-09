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

    const html = document.documentElement
    const body = document.body

    // Keep the page frozen behind the overlay while allowing the drawer itself to scroll.
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyDrawerScrollLock: body.dataset.drawerScrollLock,
    }

    window.__lenis?.stop?.()
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    html.style.overscrollBehavior = "none"
    body.style.overscrollBehavior = "none"
    body.dataset.drawerScrollLock = "true"

    return () => {
      html.style.overflow = previous.htmlOverflow
      body.style.overflow = previous.bodyOverflow
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior
      if (previous.bodyDrawerScrollLock) {
        body.dataset.drawerScrollLock = previous.bodyDrawerScrollLock
      } else {
        delete body.dataset.drawerScrollLock
      }
      window.__lenis?.start?.()
    }
  }, [open])

  if (!mounted || !open || !data) return null

  const drawerIntro = data.drawerIntro ?? data.intro
  const drawerPoints = data.drawerPoints ?? data.points ?? []
  const items = data.items ?? []

  return createPortal(
    <div className="fixed inset-0 z-[5000] bg-white" role="dialog" aria-modal="true" aria-label={data.title}>
      {/* This container is the only scrollable area while the drawer is open. */}
      <div className="h-dvh overflow-y-auto" data-sequence-native-scroll>
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-10 pt-5 md:px-8 md:pb-14 md:pt-7">
          <div className="sticky top-0 z-20 flex justify-end bg-white/95 py-2 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close facility details"
              className="grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:bg-neutral-50"
            >
              <PiXBold className="text-lg" />
            </button>
          </div>

          <section className="mt-2 rounded-[1.75rem] border border-neutral-200 bg-[#fcfcfc] p-5 md:p-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/72">
              <PiImageSquareLight className="text-black/80" />
              <span>{data.eyebrow}</span>
            </div>

            <h2 className="mt-4 max-w-[18ch] font-accent text-[2rem] font-semibold uppercase leading-[1.02] text-black md:text-[3.5rem]">
              {data.title}
            </h2>

            <div className="mt-5 grid gap-4 border-y border-neutral-200 py-5 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start">
              <p className="text-sm leading-6 text-[#4a5875] md:text-base">
                {drawerIntro}
              </p>

              <div className="rounded-2xl bg-[#eef4ff] p-4 text-black">
                <p className="text-3xl font-semibold leading-none md:text-[2.5rem]">
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
          </section>

          {items.length ? (
            <section className="mt-5 grid gap-4">
              {items.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white md:grid md:grid-cols-[260px_minmax(0,1fr)]"
                >
                  <div className="relative h-56 bg-neutral-100 md:h-full md:min-h-[220px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 260px, 100vw"
                    />
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="font-accent text-[1.5rem] font-semibold uppercase leading-tight text-[var(--color-primary-500)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#55627e] md:text-base">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
