"use client"

export default function DebugPanel({
  label = "Sequence",
  currentFrame = 1,
  frameCount = 1,
  progress = 0,
  activeAnchor,
}) {
  return (
    <div className="pointer-events-none absolute left-3 top-20 z-50 w-44 rounded-xl bg-black/75 px-3 py-2 text-[11px] font-medium text-white backdrop-blur md:left-4 md:top-24 md:w-48 md:text-xs">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">{label}</p>
      <div className="mt-2 space-y-1.5">
        <p className="flex items-center justify-between gap-3">
          <span className="text-white/60">Frame</span>
          <span>
            {currentFrame} / {frameCount}
          </span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-white/60">Progress</span>
          <span>{Math.round(progress * 100)}%</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-white/60">Anchor</span>
          <span>{activeAnchor?.id ?? "-"}</span>
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white transition-[width] duration-100"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  )
}
