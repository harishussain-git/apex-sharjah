"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

const SOUND_SRC = "/sound/bgm-1.mp3"
const SOUND_VOLUME = 0.32
const TRY_PLAY_ON_LOAD = true
const AUTOPLAY_RESUME_TIMEOUT = 700
const USER_RESUME_TIMEOUT = 2500

const getAudioContextConstructor = () =>
  window.AudioContext || window.webkitAudioContext

const decodeAudioData = (context, data) =>
  new Promise((resolve, reject) => {
    const result = context.decodeAudioData(data, resolve, reject)

    if (result?.then) {
      result.then(resolve).catch(reject)
    }
  })

const withTimeout = (promise, timeout, message) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(message)), timeout)
    }),
  ])

export default function SoundBtn() {
  const audioContextRef = useRef(null)
  const bufferRef = useRef(null)
  const gainRef = useRef(null)
  const sourceRef = useRef(null)
  const loadingPromiseRef = useRef(null)
  const playAttemptRef = useRef(0)
  const [status, setStatus] = useState("idle")

  const isPlaying = status === "playing"
  const isLoading = status === "loading"

  const stopSound = useCallback(() => {
    try {
      sourceRef.current?.stop()
    } catch {
      // Source nodes can only be stopped once.
    }

    sourceRef.current?.disconnect()
    sourceRef.current = null

    if (gainRef.current) {
      gainRef.current.gain.value = 0
    }
  }, [])

  const ensureAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current

    const AudioContextConstructor = getAudioContextConstructor()

    if (!AudioContextConstructor) {
      throw new Error("Web Audio is not supported in this browser.")
    }

    const context = new AudioContextConstructor()
    const gain = context.createGain()

    gain.gain.value = 0
    gain.connect(context.destination)

    audioContextRef.current = context
    gainRef.current = gain

    return context
  }, [])

  const loadBuffer = useCallback(async (context) => {
    if (bufferRef.current) return bufferRef.current

    loadingPromiseRef.current ||= fetch(SOUND_SRC, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${SOUND_SRC}`)
        }

        return response.arrayBuffer()
      })
      .then((data) => decodeAudioData(context, data))
      .then((buffer) => {
        bufferRef.current = buffer
        return buffer
      })

    return loadingPromiseRef.current
  }, [])

  const playSound = useCallback(async ({ isAutoplay = false } = {}) => {
    const attempt = playAttemptRef.current + 1
    playAttemptRef.current = attempt
    setStatus("loading")

    try {
      const context = ensureAudioContext()

      if (context.state === "suspended") {
        await withTimeout(
          context.resume(),
          isAutoplay ? AUTOPLAY_RESUME_TIMEOUT : USER_RESUME_TIMEOUT,
          "Audio context resume timed out.",
        )
      }

      if (context.state !== "running") {
        throw new Error("Audio context is blocked until user interaction.")
      }

      const buffer = await loadBuffer(context)
      const source = context.createBufferSource()

      if (playAttemptRef.current !== attempt) return

      stopSound()

      source.buffer = buffer
      source.loop = true
      source.connect(gainRef.current)
      source.start()

      gainRef.current.gain.setTargetAtTime(
        SOUND_VOLUME,
        context.currentTime,
        0.08,
      )
      sourceRef.current = source
      setStatus("playing")
    } catch {
      if (playAttemptRef.current !== attempt) return

      stopSound()
      setStatus("idle")
    }
  }, [ensureAudioContext, loadBuffer, stopSound])

  const pauseSound = useCallback(() => {
    playAttemptRef.current += 1
    stopSound()
    setStatus("idle")
  }, [stopSound])

  const toggleSound = () => {
    if (isPlaying) {
      pauseSound()
      return
    }

    playSound({ isAutoplay: false })
  }

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.visibilityState === "hidden") {
        pauseSound()
      }
    }

    document.addEventListener("visibilitychange", pauseWhenHidden)
    window.addEventListener("pagehide", pauseSound)

    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden)
      window.removeEventListener("pagehide", pauseSound)
      stopSound()
      audioContextRef.current?.close()
      audioContextRef.current = null
    }
  }, [pauseSound, stopSound])

  useEffect(() => {
    if (!TRY_PLAY_ON_LOAD) return

    const timer = window.setTimeout(() => {
      playSound({ isAutoplay: true })
    }, 0)

    return () => window.clearTimeout(timer)
  }, [playSound])

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`fixed bottom-6 left-6 z-[1001] inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur transition-all sm:right-6 ${
        isPlaying ? "bg-white text-neutral-900" : "bg-black text-white"
      } ${isLoading ? "cursor-wait opacity-80" : "cursor-pointer"}`}
      aria-label={isPlaying ? "Pause background sound" : "Play background sound"}
      aria-pressed={isPlaying}
    >
      <Image
        src={isPlaying ? "/icons/sound-on.gif" : "/icons/sound-off.svg"}
        alt=""
        width={28}
        height={28}
        unoptimized
        className="h-6 w-6 object-contain"
      />
    </button>
  )
}
