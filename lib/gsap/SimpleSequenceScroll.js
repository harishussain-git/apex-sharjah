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

const nearestSnapIndex = (points, value) =>
  points.reduce((best, point, index) => {
    const bestDistance = Math.abs(value - points[best])
    const nextDistance = Math.abs(value - point)
    return nextDistance < bestDistance ? index : best
  }, 0)

export function useSimpleSequenceScroll({
  sectionRef,
  canvasRef,
  frameCount,
  frameSrc,
  anchors = [],
  scrollScreens = 1,
  snap,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(1)
  const [progress, setProgress] = useState(0)
  const snapEnabled = snap?.enabled ?? false
  const snapDelay = snap?.delay ?? 0
  const snapEase = snap?.ease ?? "power2.out"
  const snapDirectional = snap?.directional ?? true
  const snapMode = snap?.mode ?? "nearest"
  const snapThreshold = snap?.threshold ?? 0.01
  const snapDuration = JSON.stringify(snap?.duration ?? { min: 0.12, max: 0.22 })

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (!section || !canvas || !context || !frameCount) return

    let drawnFrame = 0
    let activeAnchorIndex = 0
    let snappedAnchorIndex = 0
    let lastDirection = 1
    const playhead = { frame: 1 }
    const snapPoints = Array.from(
      new Set(
        anchors.map(({ frame }) => (Math.max(1, Math.min(frameCount, frame)) - 1) / Math.max(frameCount - 1, 1)),
      ),
    ).sort((left, right) => left - right)
    const images = preloadFrames({
      frameCount,
      frameSrc,
      onLoad: (frame) => {
        if (frame === 1 || Math.round(playhead.frame) === frame) render(true)
      },
    })

    const getSnapTarget = (value, trigger) => {
      if (snapPoints.length < 2) return value

      if (snapMode !== "step") {
        return value
      }

      const currentPoint = snapPoints[snappedAnchorIndex]
      const delta = value - currentPoint
      const direction = trigger?.direction || lastDirection

      if (Math.abs(delta) < snapThreshold) {
        return currentPoint
      }

      if (direction > 0 && delta > 0) {
        snappedAnchorIndex = Math.min(snappedAnchorIndex + 1, snapPoints.length - 1)
      } else if (direction < 0 && delta < 0) {
        snappedAnchorIndex = Math.max(snappedAnchorIndex - 1, 0)
      } else {
        snappedAnchorIndex = nearestSnapIndex(snapPoints, value)
      }

      return snapPoints[snappedAnchorIndex]
    }

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
      setProgress((drawnFrame - 1) / Math.max(frameCount - 1, 1))
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
        onUpdate: (trigger) => {
          if (trigger.direction) {
            lastDirection = trigger.direction
          }
        },
        snap:
          snapEnabled && snapPoints.length > 1
            ? {
                snapTo: snapMode === "step" ? getSnapTarget : snapPoints,
                delay: snapDelay,
                duration: JSON.parse(snapDuration),
                ease: snapEase,
                directional: snapDirectional,
              }
            : false,
      },
    })

    window.addEventListener("resize", sizeCanvas)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener("resize", sizeCanvas)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [
    anchors,
    canvasRef,
    frameCount,
    frameSrc,
    scrollScreens,
    sectionRef,
    snapDelay,
    snapMode,
    snapThreshold,
    snapDirectional,
    snapDuration,
    snapEase,
    snapEnabled,
  ])

  return {
    activeIndex,
    activeAnchor: anchors[activeIndex],
    currentFrame,
    progress,
  }
}
