"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { drawFrame, preloadFrames } from "../sequence/frameHelpers"

gsap.registerPlugin(ScrollTrigger)

const nearestAnchorIndex = (anchors, frame) =>
  anchors.reduce((best, anchor, index) => {
    const bestDistance = Math.abs(frame - anchors[best].frame)
    const nextDistance = Math.abs(frame - anchor.frame)
    return nextDistance < bestDistance ? index : best
  }, 0)

export function useSimpleSequenceScroll({
  sectionRef,
  canvasRef,
  frameCount,
  frameSrc,
  anchors = [],
  scrollScreens = 1,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(1)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (!section || !canvas || !context || !frameCount) return

    let drawnFrame = 0
    let activeAnchorIndex = 0
    const playhead = { frame: 1 }
    const images = preloadFrames({
      frameCount,
      frameSrc,
      onLoad: (frame) => {
        if (frame === 1 || Math.round(playhead.frame) === frame) render(true)
      },
    })

    const sizeCanvas = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      render(true)
    }

    const updateAnchor = (frame) => {
      if (!anchors.length) return

      const index = nearestAnchorIndex(anchors, frame)
      if (index === activeAnchorIndex) return

      activeAnchorIndex = index
      setActiveIndex(index)
    }

    const render = (force = false) => {
      const frame = Math.max(1, Math.min(frameCount, Math.round(playhead.frame)))
      if (!force && frame === drawnFrame) return

      drawnFrame = drawFrame({ canvas, context, images, frame, frameCount })
      setCurrentFrame(drawnFrame)
      updateAnchor(drawnFrame)
    }

    sizeCanvas()

    const tween = gsap.to(playhead, {
      frame: frameCount,
      ease: "none",
      onUpdate: render,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * scrollScreens}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    window.addEventListener("resize", sizeCanvas)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener("resize", sizeCanvas)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [anchors, canvasRef, frameCount, frameSrc, scrollScreens, sectionRef])

  return {
    activeIndex,
    activeAnchor: anchors[activeIndex],
    currentFrame,
  }
}
