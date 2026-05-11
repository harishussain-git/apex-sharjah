"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function SoundBtn() {
  const audioRef = useRef(null)
  const shouldPlayRef = useRef(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const audio = new Audio("/sound/bgm-1.mp3")
    audioRef.current = audio
    audio.loop = true
    audio.volume = 0.32
    audio.preload = "auto"

    const tryPlay = async () => {
      if (!shouldPlayRef.current) return

      try {
        await audio.play()
      } catch {
        // Mobile/desktop browsers may block autoplay until first interaction.
      }
    }

    const resumeOnInteract = () => {
      tryPlay()
    }

    tryPlay()

    window.addEventListener("pointerdown", resumeOnInteract)
    window.addEventListener("touchstart", resumeOnInteract, { passive: true })
    window.addEventListener("keydown", resumeOnInteract)
    window.addEventListener("wheel", resumeOnInteract, { passive: true })

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteract)
      window.removeEventListener("touchstart", resumeOnInteract)
      window.removeEventListener("keydown", resumeOnInteract)
      window.removeEventListener("wheel", resumeOnInteract)
      audio.pause()
      audio.src = ""
      audioRef.current = null
    }
  }, [])

  const toggleSound = async () => {
    const nextPlaying = !isPlaying
    setIsPlaying(nextPlaying)
    shouldPlayRef.current = nextPlaying

    if (!audioRef.current) return

    if (nextPlaying) {
      try {
        await audioRef.current.play()
      } catch {
        // If blocked, first interaction listeners will retry.
      }
      return
    }

    audioRef.current.pause()
  }

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`fixed bottom-6 left-6 z-[1001] inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur transition-all sm:right-6 ${isPlaying ? "bg-white text-neutral-900" : "bg-black text-white"}`}
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
