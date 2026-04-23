"use client"

import { useEffect, useState } from "react"

const sequenceAssets = [
  { folder: "/sequences/new/hero-white", count: 39 },
  { folder: "/sequences/new/white-bus-3", count: 136 },
]

const assets = sequenceAssets.flatMap(({ folder, count }) =>
  Array.from(
    { length: count },
    (_, index) => `${folder}/${String(index + 1).padStart(4, "0")}.webp`,
  ),
)

const loadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image()

    image.decoding = "async"
    image.onload = async () => {
      try {
        await image.decode?.()
      } finally {
        resolve({ ok: true, src })
      }
    }
    image.onerror = () => resolve({ ok: false, src })
    image.src = src
  })

export default function AssetLoader({ children }) {
  const [status, setStatus] = useState({
    done: 0,
    failed: 0,
    firstFailed: "",
    ready: false,
  })

  useEffect(() => {
    let cancelled = false
    let cursor = 0
    let done = 0
    let failed = 0
    let firstFailed = ""
    const concurrency = 8

    const update = () => {
      if (!cancelled) {
        setStatus({ done, failed, firstFailed, ready: done >= assets.length })
      }
    }

    const worker = async () => {
      while (!cancelled && cursor < assets.length) {
        const src = assets[cursor]
        cursor += 1

        const result = await loadImage(src)
        done += 1

        if (!result.ok) {
          failed += 1
          firstFailed ||= result.src
        }

        update()
      }
    }

    Promise.all(Array.from({ length: concurrency }, worker)).then(update)

    return () => {
      cancelled = true
    }
  }, [])

  if (status.ready) {
    return children
  }

  const percent = Math.round((status.done / assets.length) * 100)

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 text-center text-[var(--color-primary-500)]">
      <div className="w-full max-w-sm">
        <p className="text-eyebrow">Loading Apex</p>
        <p className="mt-3 font-accent text-5xl font-semibold leading-none">{percent}%</p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[var(--color-primary-500)]/10">
          <div
            className="h-full rounded-full bg-[var(--color-primary-500)] transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="mt-4 text-caption text-neutral-500">
          {status.done} / {assets.length} sequence frames loaded
          {status.failed > 0 ? `, ${status.failed} failed` : ""}
        </p>

        {status.firstFailed ? (
          <p className="mt-2 break-all text-caption text-red-600">{status.firstFailed}</p>
        ) : null}
      </div>
    </main>
  )
}
