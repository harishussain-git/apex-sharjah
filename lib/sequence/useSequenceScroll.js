"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

import { drawFrame, preloadFrames } from "./frameHelpers"

gsap.registerPlugin(ScrollTrigger)

const defaultOptions = {
  stepDuration: 1.5,
  stepEase: "none",
  unlockDelay: 0.04,
  wheelThreshold: 32,
  touchThreshold: 42,
  pinDistancePerStep: 1.35,
}

export function useSequenceScroll({
  sectionRef,
  canvasRef,
  frameCount,
  frameSrc,
  anchors,
  options = {},
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [debug, setDebug] = useState({
    activeIndex: 0,
    activeId: anchors[0]?.id ?? "",
    currentFrame: anchors[0]?.frame ?? 1,
    targetFrame: anchors[0]?.frame ?? 1,
    pinned: false,
    locked: false,
    lastInput: "idle",
    wheelProgress: 0,
    touchProgress: 0,
  })

  const activeIndexRef = useRef(0)
  const lockedRef = useRef(false)
  const pinnedRef = useRef(false)
  const releaseRef = useRef(null)
  const wheelProgressRef = useRef(0)
  const touchStartYRef = useRef(0)
  const currentFrameRef = useRef(anchors[0]?.frame ?? 1)

  const {
    stepDuration,
    stepEase,
    unlockDelay,
    wheelThreshold,
    touchThreshold,
    pinDistancePerStep,
  } = { ...defaultOptions, ...options }

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current

    if (!section || !canvas || !anchors.length) {
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    const playhead = { frame: anchors[0].frame }
    let pinTrigger

    const updateDebug = (patch) => {
      setDebug((current) => ({ ...current, ...patch }))
    }

    const images = preloadFrames({
      frameCount,
      frameSrc,
      onLoad: (frame) => {
        if (frame === anchors[0].frame) {
          drawCurrentFrame()
        }
      },
    })

    const setCanvasSize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawCurrentFrame = () => {
      const frame = drawFrame({
        canvas,
        context,
        images,
        frame: playhead.frame,
        frameCount,
      })

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame
        updateDebug({ currentFrame: frame })
      }
    }

    const syncActiveIndex = (index) => {
      activeIndexRef.current = index
      setActiveIndex(index)
      updateDebug({
        activeIndex: index,
        activeId: anchors[index]?.id ?? "",
        targetFrame: anchors[index]?.frame ?? 1,
      })
    }

    const clearRelease = () => {
      releaseRef.current?.kill()
      releaseRef.current = null
    }

    const resetProgress = () => {
      wheelProgressRef.current = 0
      updateDebug({ wheelProgress: 0, touchProgress: 0 })
    }

    const unlockLater = () => {
      clearRelease()
      releaseRef.current = gsap.delayedCall(unlockDelay, () => {
        lockedRef.current = false
        updateDebug({ locked: false })
      })
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1,
    })

    const goToStep = (index, source) => {
      if (!anchors[index]) {
        return
      }

      lockedRef.current = true
      resetProgress()
      syncActiveIndex(index)
      updateDebug({ locked: true, lastInput: source })

      gsap.to(playhead, {
        frame: anchors[index].frame,
        duration: stepDuration,
        ease: stepEase,
        overwrite: true,
        onUpdate: drawCurrentFrame,
        onComplete: unlockLater,
      })
    }

    const releaseScroll = (direction, source) => {
      if (!pinTrigger) {
        return
      }

      lockedRef.current = true
      updateDebug({ locked: true, lastInput: `${source}-release` })
      lenis.start()

      const target = direction > 0 ? pinTrigger.end + 4 : pinTrigger.start - 4

      requestAnimationFrame(() => {
        lenis.scrollTo(target, {
          immediate: true,
          force: true,
        })
        unlockLater()
      })
    }

    const stepBy = (direction, source) => {
      if (!pinnedRef.current || lockedRef.current) {
        return
      }

      const nextIndex = activeIndexRef.current + direction

      if (nextIndex < 0 || nextIndex >= anchors.length) {
        releaseScroll(direction, source)
        return
      }

      goToStep(nextIndex, source)
    }

    const onWheel = (event) => {
      if (!pinnedRef.current) {
        return
      }

      event.preventDefault()

      wheelProgressRef.current += event.deltaY
      updateDebug({
        lastInput: "wheel",
        wheelProgress: Math.round(wheelProgressRef.current),
      })

      if (Math.abs(wheelProgressRef.current) < wheelThreshold) {
        return
      }

      const direction = wheelProgressRef.current > 0 ? 1 : -1
      wheelProgressRef.current = 0
      stepBy(direction, "wheel")
    }

    const onTouchStart = (event) => {
      if (!pinnedRef.current || !event.touches[0]) {
        return
      }

      touchStartYRef.current = event.touches[0].clientY
      updateDebug({ lastInput: "touch-start", touchProgress: 0 })
    }

    const onTouchMove = (event) => {
      if (!pinnedRef.current || !event.touches[0]) {
        return
      }

      event.preventDefault()

      const currentY = event.touches[0].clientY
      const deltaY = touchStartYRef.current - currentY

      updateDebug({
        lastInput: "touch-move",
        touchProgress: Math.round(deltaY),
      })

      if (Math.abs(deltaY) < touchThreshold || lockedRef.current) {
        return
      }

      touchStartYRef.current = currentY
      const direction = deltaY > 0 ? 1 : -1
      stepBy(direction, "touch")
    }

    const onTouchEnd = () => {
      updateDebug({ touchProgress: 0, lastInput: "touch-end" })
    }

    const tick = (time) => lenis.raf(time * 1000)
    const onResize = () => {
      setCanvasSize()
      drawCurrentFrame()
      ScrollTrigger.refresh()
    }

    const enablePinnedMode = () => {
      pinnedRef.current = true
      section.style.touchAction = "none"
      section.style.overscrollBehavior = "contain"
      lenis.stop()
      updateDebug({ pinned: true, lastInput: "pinned-enter" })
    }

    const disablePinnedMode = () => {
      pinnedRef.current = false
      lockedRef.current = false
      clearRelease()
      resetProgress()
      section.style.touchAction = ""
      section.style.overscrollBehavior = ""
      lenis.start()
      updateDebug({ pinned: false, locked: false, lastInput: "pinned-leave" })
    }

    setCanvasSize()
    drawCurrentFrame()
    syncActiveIndex(0)

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.addEventListener("resize", onResize)
    window.addEventListener("wheel", onWheel, { passive: false })
    section.addEventListener("touchstart", onTouchStart, { passive: true })
    section.addEventListener("touchmove", onTouchMove, { passive: false })
    section.addEventListener("touchend", onTouchEnd)

    pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * anchors.length * pinDistancePerStep}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: enablePinnedMode,
      onEnterBack: enablePinnedMode,
      onLeave: disablePinnedMode,
      onLeaveBack: disablePinnedMode,
    })

    return () => {
      clearRelease()
      window.removeEventListener("resize", onResize)
      window.removeEventListener("wheel", onWheel)
      section.removeEventListener("touchstart", onTouchStart)
      section.removeEventListener("touchmove", onTouchMove)
      section.removeEventListener("touchend", onTouchEnd)
      section.style.touchAction = ""
      section.style.overscrollBehavior = ""
      pinTrigger?.kill()
      gsap.killTweensOf(playhead)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [
    anchors,
    canvasRef,
    frameCount,
    frameSrc,
    pinDistancePerStep,
    sectionRef,
    stepDuration,
    stepEase,
    touchThreshold,
    unlockDelay,
    wheelThreshold,
  ])

  return {
    activeIndex,
    activeAnchor: anchors[activeIndex] ?? anchors[0] ?? null,
    debug,
  }
}
