"use client"

export default function LearningJourneyProgressDemo2({
  items,
  activeIndex,
  onSelect,
}) {
  const total = Math.max(items.length - 1, 1)
  const progress = (activeIndex / total) * 100

  return (
    <div className=" md:fixed right-10 top-1/2 z-[850] hidden -translate-y-1/2 items-center gap-4 md:flex bg-white/50 py-4 px-3 rounded-lg backdrop-blur-md">
      <div className="relative h-[340px] w-px bg-[#344384]/18">
        <span
          className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#344384] transition-all duration-500 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div className="flex h-[340px] flex-col justify-between">
        {items.map((item, index) => {
          const isActive = activeIndex === index

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`cursor-pointer font-mono text-sm font-medium leading-none transition duration-300 hover:text-[#081947] ${
                isActive ? "translate-x-1 text-[#081947] font-bold" : "text-black/80"
              }`}
              aria-label={`Go to demo 2 item ${item.order}`}
            >
              {item.order}
            </button>
          )
        })}
      </div>
    </div>
  )
}
