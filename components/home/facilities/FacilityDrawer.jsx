"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PiCheckLight, PiImageSquareLight, PiXBold } from "react-icons/pi"

export default function FacilityDrawer({ data, open, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (open && dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const html = document.documentElement
    const body = document.body
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

  if (!open || !data) return null

  const drawerIntro = data.drawerIntro ?? data.intro
  const drawerPoints = data.drawerPoints ?? data.points ?? []
  const items = data.items ?? []

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={data.title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-white p-0 backdrop:bg-transparent"
    >
      <div className="h-dvh overflow-y-auto" data-sequence-native-scroll>
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-10 pt-5 md:px-8 md:pb-14 md:pt-7">
          <div className="sticky top-0 z-20 flex justify-end bg-white/95 py-2 backdrop-blur">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close facility details"
              className="grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:bg-neutral-50"
            >
              <PiXBold aria-hidden="true" className="text-lg" />
            </button>
          </div>

          <section className="mt-2 rounded-[1.75rem] border border-neutral-200 bg-[#fcfcfc] p-5 md:p-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/72">
              <PiImageSquareLight aria-hidden="true" className="text-black/80" />
              <span>{data.eyebrow}</span>
            </div>

            <h2 className="mt-4 max-w-[18ch] font-accent text-[2rem] font-semibold uppercase leading-[1.02] text-black md:text-[3.5rem]">
              {data.title}
            </h2>

            <div className="mt-5 border-y border-neutral-200 py-5">
              <p className="text-sm leading-6 text-[#4a5875] md:text-base">
                {drawerIntro}
              </p>
            </div>

            {drawerPoints.length ? (
              <ul className="mt-5 grid gap-3 text-sm text-[#2e3748] md:grid-cols-2">
                {drawerPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3">
                    <PiCheckLight aria-hidden="true" className="mt-0.5 shrink-0 text-[1.1rem] text-[#123f8b]" />
                    <span className="leading-5">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {items.length ? (
            <section className="mt-5 grid gap-4" aria-label={`${data.title} details`}>
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
                      sizes="(min-width: 768px) 260px, 100vw"
                      className="object-cover"
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
    </dialog>,
    document.body,
  )
}
