"use client"

import { PiArrowDown, PiArrowUp } from "react-icons/pi"

export default function LearningJourneyControlsDemo2({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) {
  return (
    <div className="md:fixed bottom-6 left-1/2 z-[900] flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/50 md:p-1.5 lg:p-2 backdrop-blur-lg">
      <button
        type="button"
        aria-label="Previous demo 2 item"
        onClick={onPrevious}
        disabled={previousDisabled}
        className="grid md:size-10 lg:size-12 place-items-center rounded-full border border-slate-200 bg-white/80 text-[#081947] shadow-[0_14px_35px_rgba(8,25,71,0.12)] transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
      >
        <PiArrowUp className="md:text-lg lg:text-xl" />
      </button>

      <button
        type="button"
        aria-label="Next demo 2 item"
        onClick={onNext}
        disabled={nextDisabled}
        className="grid md:size-10 lg:size-12 place-items-center rounded-full border border-slate-200 bg-white/80 text-[#081947] shadow-[0_14px_35px_rgba(8,25,71,0.12)] transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
      >
        <PiArrowDown className="md:text-lg lg:text-xl" />
      </button>
    </div>
  )
}
