"use client"

import Script from "next/script"

const engineScript = String.raw`
(() => {
  const ids = {
    section: "seq-section",
    canvas: "seq-canvas",
    debug: "seq-debug",
  }

  const frameCount = 145
  const frameSrc = (frame) => "/sequences/seq/" + String(frame + 1).padStart(4, "0") + ".webp"

  const debug = document.getElementById(ids.debug)
  const section = document.getElementById(ids.section)
  const canvas = document.getElementById(ids.canvas)
  const context = canvas && canvas.getContext("2d")

  if (window.__sequenceIslandCleanup) window.__sequenceIslandCleanup()

  const state = {
    mounted: false,
    gsapSetupStarted: false,
    preloadStarted: false,
    preloadFinished: false,
    scrollTriggerCreated: false,
    firstDrawDone: false,
    lenisCreated: false,
    frameUpdates: 0,
    frame: 0,
    drawnFrame: -1,
    loaded: 0,
    failed: 0,
    firstFailed: "",
    progress: 0,
    canvasSize: "0 x 0",
    status: "inline script booted",
  }

  const writeDebug = (force = false) => {
    if (!debug) return
    const now = performance.now()
    if (!force && now - (state.debugLast || 0) < 120) return
    state.debugLast = now
    debug.textContent = [
      "status: " + state.status,
      "mounted: " + state.mounted,
      "gsap setup: " + state.gsapSetupStarted,
      "preload: " + state.preloadStarted + " / " + state.preloadFinished,
      "trigger: " + state.scrollTriggerCreated,
      "lenis: " + state.lenisCreated,
      "first draw: " + state.firstDrawDone,
      "frame: " + (state.frame + 1) + " / " + frameCount,
      "updates: " + state.frameUpdates,
      "progress: " + state.progress.toFixed(3),
      "loaded: " + state.loaded,
      "failed: " + state.failed,
      "canvas: " + state.canvasSize,
      state.firstFailed ? "first failed: " + state.firstFailed : "first failed: none",
    ].join("\\n")
  }

  const log = (message) => {
    state.status = message
    console.info("[sequence-island]", message, { ...state })
    writeDebug(true)
  }

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="' + src + '"]')
      if (existing) {
        existing.addEventListener("load", resolve, { once: true })
        if (existing.dataset.loaded) resolve()
        return
      }

      const script = document.createElement("script")
      script.src = src
      script.async = true
      script.onload = () => {
        script.dataset.loaded = "true"
        resolve()
      }
      script.onerror = reject
      document.head.appendChild(script)
    })

  const boot = async () => {
    if (!section || !canvas || !context || !debug) {
      state.status = "missing dom refs"
      writeDebug(true)
      return
    }

    state.mounted = true
    log("page mounted")

    const drawEarlyFirstFrame = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      state.canvasSize = canvas.width + " x " + canvas.height

      const image = new Image()
      image.onload = () => {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
        const drawWidth = image.naturalWidth * scale
        const drawHeight = image.naturalHeight * scale
        context.clearRect(0, 0, width, height)
        context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
        state.firstDrawDone = true
        state.drawnFrame = 0
        log("first draw done")
      }
      image.onerror = () => {
        state.failed += 1
        state.firstFailed = frameSrc(0)
        log("first frame failed")
      }
      image.src = frameSrc(0)
      writeDebug(true)
    }

    drawEarlyFirstFrame()

    try {
      if (!window.gsap) {
        log("loading gsap cdn")
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js")
      }
      if (!window.ScrollTrigger) {
        log("loading scrolltrigger cdn")
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js")
      }
      if (!window.Lenis) {
        log("loading lenis cdn")
        await loadScript("https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js")
      }
    } catch (error) {
      console.error(error)
      log("script load failed")
      return
    }

    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    const images = []
    const playhead = { frame: 0 }
    let rafId = 0
    let debugId = 0
    let tween = null
    let lenis = null

    const nearestLoaded = (frame) => {
      if (images[frame] && images[frame].naturalWidth) return { image: images[frame], frame }
      for (let offset = 1; offset < frameCount; offset += 1) {
        const before = frame - offset
        const after = frame + offset
        if (images[before] && images[before].naturalWidth) return { image: images[before], frame: before }
        if (images[after] && images[after].naturalWidth) return { image: images[after], frame: after }
      }
      return null
    }

    const drawFrame = (frame) => {
      const result = nearestLoaded(frame)
      if (!result || result.frame === state.drawnFrame) return

      const image = result.image
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale

      context.clearRect(0, 0, width, height)
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
      state.drawnFrame = result.frame

      if (!state.firstDrawDone) {
        state.firstDrawDone = true
        log("first draw done")
      }
    }

    const requestDraw = (frame) => {
      state.frame = Math.max(0, Math.min(frameCount - 1, Math.round(frame)))
      state.frameUpdates += 1
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        drawFrame(state.frame)
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      state.canvasSize = canvas.width + " x " + canvas.height
      state.drawnFrame = -1
      requestDraw(state.frame)
      writeDebug(true)
    }

    const preload = () => {
      state.preloadStarted = true
      log("preload started")

      const loadFrame = (frame) => {
        const image = new Image()
        image.decoding = "async"
        image.onload = () => {
          state.loaded += 1
          if (frame === 0 || frame === state.frame) requestDraw(state.frame)
          if (state.loaded + state.failed === frameCount) {
            state.preloadFinished = true
            log(state.failed ? "preload finished with failures" : "preload finished")
          } else {
            writeDebug()
          }
        }
        image.onerror = () => {
          state.failed += 1
          if (!state.firstFailed) state.firstFailed = frameSrc(frame)
          if (state.loaded + state.failed === frameCount) {
            state.preloadFinished = true
            log("preload finished with failures")
          } else {
            writeDebug()
          }
        }
        image.src = frameSrc(frame)
        images[frame] = image
      }

      loadFrame(0)
      requestAnimationFrame(() => {
        for (let frame = 1; frame < frameCount; frame += 1) loadFrame(frame)
      })
    }

    const setupLenis = () => {
      if (!window.Lenis) return
      lenis = new window.Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
      })
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      state.lenisCreated = true
      log("lenis created")
    }

    const setupGsap = () => {
      state.gsapSetupStarted = true
      log("gsap setup started")

      tween = gsap.to(playhead, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            state.progress = self.progress
            requestDraw(playhead.frame)
            writeDebug()
          },
        },
      })

      state.scrollTriggerCreated = true
      log("scrolltrigger created")
    }

    resize()
    preload()
    setupLenis()
    setupGsap()
    ScrollTrigger.refresh()

    debugId = window.setInterval(writeDebug, 250)
    window.addEventListener("resize", resize)
    window.addEventListener("orientationchange", resize)

    window.__sequenceIslandCleanup = () => {
      window.clearInterval(debugId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("orientationchange", resize)
      if (rafId) cancelAnimationFrame(rafId)
      if (tween) {
        if (tween.scrollTrigger) tween.scrollTrigger.kill()
        tween.kill()
      }
      if (lenis) lenis.destroy()
      state.mounted = false
      writeDebug(true)
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true })
  } else {
    boot()
  }
})()
`

export default function FramerTestPage() {
  return (
    <main className="bg-black text-white">
      <section id="seq-section" className="relative h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas id="seq-canvas" className="absolute inset-0 h-full w-full" />

          <div className="pointer-events-none relative z-10 flex h-screen items-center justify-center px-6 text-center">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              GSAP Canvas Island
            </h1>
          </div>

          <pre
            id="seq-debug"
            className="fixed left-2 top-2 z-30 max-w-[calc(100vw-1rem)] whitespace-pre-wrap rounded-lg bg-black/85 p-3 font-mono text-[11px] leading-4 text-lime-200 shadow-xl ring-1 ring-white/15 sm:text-xs"
          >
            html rendered - waiting for island...
          </pre>
        </div>
      </section>

      <script
        id="sequence-island-engine-inline"
        dangerouslySetInnerHTML={{ __html: engineScript }}
      />
      <Script
        id="sequence-island-engine"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: engineScript }}
      />
    </main>
  )
}
