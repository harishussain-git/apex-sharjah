"use client"

import { PiArrowDown, PiArrowUp } from "react-icons/pi"

export default function LearningJourneyControls({
  onPrevious,
  onNext,
  previousDisabled = false,
  nextDisabled = false,
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-[900] flex -translate-x-1/2 items-center gap-3">
      <button
        type="button"
        aria-label="Previous learning journey item"
        onClick={onPrevious}
        disabled={previousDisabled}
        className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-[#081947] shadow-[0_14px_35px_rgba(8,25,71,0.12)] transition hover:-translate-y-0.5 hover:bg-[#344183] hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <PiArrowUp className="text-xl" />
      </button>

      <button
        type="button"
        aria-label="Next learning journey item"
        onClick={onNext}
        disabled={nextDisabled}
        className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-[#081947] shadow-[0_14px_35px_rgba(8,25,71,0.12)] transition hover:translate-y-0.5 hover:bg-[#344183] hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <PiArrowDown className="text-xl" />
      </button>
    </div>
  )
}
