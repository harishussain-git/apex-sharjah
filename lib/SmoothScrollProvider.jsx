"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
      lerp: 0.1,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      touchMultiplier: 1,
      syncTouch: false,
    })

    window.__lenis = lenis

    let rafId = 0

    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    lenis.on("scroll", ScrollTrigger.update)
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      delete window.__lenis
      lenis.destroy()
    }
  }, [])

  return children
}
