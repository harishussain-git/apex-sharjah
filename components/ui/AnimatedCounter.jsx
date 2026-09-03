"use client"

import { useEffect, useRef, useState } from "react"

const numberFormatter = new Intl.NumberFormat("en-US")

export default function AnimatedCounter({ value, suffix = "", duration = 800 }) {
  const counterRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const counter = counterRef.current

    if (!counter) return undefined

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(() => {
        setDisplayValue(value)
      })

      return () => cancelAnimationFrame(animationFrameRef.current)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        const startTime = performance.now()

        const count = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setDisplayValue(Math.round(value * easedProgress))

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(count)
          }
        }

        animationFrameRef.current = requestAnimationFrame(count)
        observer.unobserve(counter)
      },
      { threshold: 0.35 },
    )

    observer.observe(counter)

    return () => {
      observer.disconnect()

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [duration, value])

  const finalValue = `${numberFormatter.format(value)}${suffix}`

  return (
    <span ref={counterRef} aria-label={finalValue}>
      <span aria-hidden="true">
        {numberFormatter.format(displayValue)}
        {suffix}
      </span>
    </span>
  )
}
