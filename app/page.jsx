"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const START_TIME_IN_SECONDS = 12 * 60 * 60 + 34 * 60

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":")
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(START_TIME_IN_SECONDS)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(intervalId)
          return 0
        }

        return currentTime - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <p
      aria-label={`${timeLeft} seconds remaining`}
      className="font-accent text-3xl font-semibold tracking-tight tabular-nums"
    >
      {formatTime(timeLeft)}
    </p>
  )
}

export function PageLiveSoon() {
  return (
    <main className="flex min-h-svh flex-col bg-[#a9ccf9] px-6 py-8 text-[#334187] sm:px-10 sm:py-10">

      <section className="m-auto flex max-w-3xl flex-col items-center py-16 text-center">
        <Image
          src="/home/apex-logo-big.webp"
          alt="Apex Vision Model School"
          width={853}
          height={258}
          className="mb-8 h-auto w-32 sm:w-40"
          priority
        />
        <h1 className="font-accent text-5xl leading-[0.95] font-semibold tracking-[-0.04em] sm:text-7xl">
          Site will be live soon
        </h1>
      </section>

      <p className="text-center text-xs tracking-[0.12em] text-black/75 uppercase sm:text-left">
        SITE PERFORMANCE OPTIMIZATION - IN PROGRESS...
      </p>
      <Countdown />
    </main>
  )
}

export default function Page() {
  return <PageLiveSoon />
}
