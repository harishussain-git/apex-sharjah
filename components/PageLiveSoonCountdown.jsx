"use client"

import { useEffect, useRef, useState } from "react"

function getSecondsRemaining(targetTime, currentTime) {
  return Math.max(0, Math.ceil((targetTime - currentTime) / 1000))
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":")
}

export default function PageLiveSoonCountdown({
  initialServerTime,
  targetTime,
}) {
  const [timeLeft, setTimeLeft] = useState(() =>
    getSecondsRemaining(targetTime, initialServerTime),
  )
  const serverOffset = useRef(0)

  useEffect(() => {
    serverOffset.current = initialServerTime - Date.now()

    const intervalId = window.setInterval(() => {
      const estimatedServerTime = Date.now() + serverOffset.current
      const nextTimeLeft = getSecondsRemaining(targetTime, estimatedServerTime)

      setTimeLeft(nextTimeLeft)

      if (nextTimeLeft === 0) {
        window.clearInterval(intervalId)
      }
    }, 250)

    return () => window.clearInterval(intervalId)
  }, [initialServerTime, targetTime])

  return (
    <p
      role="timer"
      aria-label={`${timeLeft} seconds remaining until 10 PM IST`}
      className="font-accent text-3xl font-semibold tracking-tight tabular-nums"
    >
      {formatTime(timeLeft)}
    </p>
  )
}
