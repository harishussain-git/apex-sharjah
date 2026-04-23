"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { drawFrame, preloadFrames } from "../sequence/frameHelpers"

gsap.registerPlugin(ScrollTrigger)

const defaults = {
  stepDuration: 4,
  stepEase: "linear",
  wheelThreshold: 4,
  touchThreshold: 24,
  pinScreensPerAnchor: 1.2,
  cooldown: 0.08,
  releaseOffset: 4,
}

const nearestAnchorIndex = (anchors, frame) =>
  anchors.reduce((best, anchor, index) => {
    const bestDistance = Math.abs(frame - anchors[best].frame)
    const nextDistance = Math.abs(frame - anchor.frame)
    return nextDistance < bestDistance ? index : best
  }, 0)

export function useStrictSequenceScroll({
  sectionRef,
  canvasRef,
  frameCount,
  frameSrc,
  anchors = [],
  options = {},
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(anchors[0]?.frame ?? 1)
  const [progress, setProgress] = useState(0)
  const config = { ...defaults, ...options }

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (!section || !canvas || !context || !anchors.length || !frameCount) return

    let pinTrigger
    let unlockCall
    let drawnFrame = anchors[0].frame
    let activeIndexRef = 0
    let pinned = false
    let locked = false
    let touchStartY = 0
    const playhead = { frame: anchors[0].frame }

    const images = preloadFrames({
      frameCount,
      frameSrc,
      onLoad: (frame) => {
        if (frame === anchors[0].frame || Math.round(playhead.frame) === frame) {
          render(true)
        }
      },
    })

    const setCanvasSize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      render(true)
    }

    const syncState = (frame) => {
      setCurrentFrame(frame)
      setProgress((frame - 1) / Math.max(frameCount - 1, 1))

      const index = nearestAnchorIndex(anchors, frame)
      if (index !== activeIndexRef) {
        activeIndexRef = index
        setActiveIndex(index)
      }
    }

    const render = (force = false) => {
      const frame = Math.max(1, Math.min(frameCount, Math.round(playhead.frame)))
      if (!force && frame === drawnFrame) return

      drawnFrame = drawFrame({ canvas, context, images, frame, frameCount })
      syncState(drawnFrame)
    }

    const clearUnlock = () => {
      unlockCall?.kill()
      unlockCall = null
    }

    const lockInput = () => {
      locked = true
      clearUnlock()
    }

    const unlockInput = () => {
      clearUnlock()
      unlockCall = gsap.delayedCall(config.cooldown, () => {
        locked = false
      })
    }

    const jumpScroll = (target) => {
      const lenis = window.__lenis

      if (lenis?.scrollTo) {
        lenis.start?.()
        lenis.scrollTo(target, { immediate: true, force: true })
        return
      }

      window.scrollTo(0, target)
    }

    const releasePin = (direction) => {
      if (!pinTrigger) return

      lockInput()
      jumpScroll(direction > 0 ? pinTrigger.end + config.releaseOffset : pinTrigger.start - config.releaseOffset)
      unlockInput()
    }

    const goToIndex = (index) => {
      if (!anchors[index]) return

      lockInput()
      activeIndexRef = index
      setActiveIndex(index)
      const targetAnchor = anchors[index]

      gsap.to(playhead, {
        frame: targetAnchor.frame,
        duration: targetAnchor.stepDuration ?? config.stepDuration,
        ease: config.stepEase,
        overwrite: true,
        onUpdate: render,
        onComplete: unlockInput,
      })
    }

    const stepBy = (direction) => {
      if (!pinned || locked) return

      const nextIndex = activeIndexRef + direction
      if (nextIndex < 0 || nextIndex >= anchors.length) {
        releasePin(direction)
        return
      }

      goToIndex(nextIndex)
    }

    const onWheel = (event) => {
      if (!pinned) return

      event.preventDefault()

      if (Math.abs(event.deltaY) < config.wheelThreshold) return
      stepBy(event.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (event) => {
      if (!pinned || !event.touches[0]) return
      touchStartY = event.touches[0].clientY
    }

    const onTouchMove = (event) => {
      if (!pinned || !event.touches[0]) return

      event.preventDefault()

      const deltaY = touchStartY - event.touches[0].clientY
      if (Math.abs(deltaY) < config.touchThreshold || locked) return

      touchStartY = event.touches[0].clientY
      stepBy(deltaY > 0 ? 1 : -1)
    }

    const onResize = () => {
      setCanvasSize()
      ScrollTrigger.refresh()
    }

    const enablePinned = () => {
      pinned = true
      section.style.touchAction = "none"
      section.style.overscrollBehavior = "contain"
      window.__lenis?.stop?.()
    }

    const disablePinned = () => {
      pinned = false
      locked = false
      clearUnlock()
      section.style.touchAction = ""
      section.style.overscrollBehavior = ""
      window.__lenis?.start?.()
    }

    setCanvasSize()
    render(true)
    syncState(anchors[0].frame)

    window.addEventListener("resize", onResize)
    window.addEventListener("wheel", onWheel, { passive: false })
    section.addEventListener("touchstart", onTouchStart, { passive: true })
    section.addEventListener("touchmove", onTouchMove, { passive: false })

    pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * Math.max(anchors.length, 1) * config.pinScreensPerAnchor}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: enablePinned,
      onEnterBack: enablePinned,
      onLeave: disablePinned,
      onLeaveBack: disablePinned,
    })

    return () => {
      clearUnlock()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onWheel)
      section.removeEventListener("touchstart", onTouchStart)
      section.removeEventListener("touchmove", onTouchMove)
      section.style.touchAction = ""
      section.style.overscrollBehavior = ""
      gsap.killTweensOf(playhead)
      pinTrigger?.kill()
      window.__lenis?.start?.()
    }
  }, [anchors, canvasRef, config.cooldown, config.pinScreensPerAnchor, config.releaseOffset, config.stepDuration, config.stepEase, config.touchThreshold, config.wheelThreshold, frameCount, frameSrc, sectionRef])

  return {
    activeIndex,
    activeAnchor: anchors[activeIndex] ?? anchors[0] ?? null,
    currentFrame,
    progress,
  }
}
