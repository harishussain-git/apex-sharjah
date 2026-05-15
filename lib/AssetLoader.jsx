"use client"

import { useEffect, useMemo, useState } from "react"

const loadAsset = async (src) => {
  try {
    const response = await fetch(src, { cache: "force-cache" })

    if (!response.ok) {
      return { ok: false, src, bytes: 0 }
    }

    const blob = await response.blob()
    return { ok: true, src, bytes: blob.size }
  } catch {
    return { ok: false, src, bytes: 0 }
  }
}

export default function AssetLoader({ assets = [], children, label = "Loading" }) {
  const assetList = useMemo(() => [...new Set(assets)].filter(Boolean), [assets])
  const [status, setStatus] = useState({
    done: 0,
    failed: 0,
    firstFailed: "",
    ready: false,
  })

  useEffect(() => {
    if (!assetList.length) {
      setStatus({
        done: 0,
        failed: 0,
        firstFailed: "",
        ready: true,
      })
      return
    }

    let cancelled = false
    let cursor = 0
    let done = 0
    let failed = 0
    let firstFailed = ""
    const concurrency = 8

    const update = () => {
      if (!cancelled) {
        setStatus({
          done,
          failed,
          firstFailed,
          ready: done >= assetList.length,
        })
      }
    }

    const worker = async () => {
      while (!cancelled && cursor < assetList.length) {
        const src = assetList[cursor]
        cursor += 1

        const result = await loadAsset(src)
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
  }, [assetList])

  if (status.ready) {
    return children
  }

  const percent = assetList.length
    ? Math.round((status.done / assetList.length) * 100)
    : 100

  return (
    <main className="fixed inset-0 z-[9999] grid min-h-screen place-items-center bg-white px-6 text-center text-[var(--color-primary-500)]">
      <div>
        <p className="text-eyebrow">{label}</p>
        <p className="mt-3 font-accent text-6xl font-semibold leading-none">
          {percent}%
        </p>
      </div>
    </main>
  )
}
