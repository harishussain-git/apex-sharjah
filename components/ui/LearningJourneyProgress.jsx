"use client"

export default function LearningJourneyProgress({ items, activeIndex, onSelect }) {
  const total = Math.max(items.length - 1, 1)
  const progress = (activeIndex / total) * 100

  return (
    <div className="fixed left-5 top-1/2 z-[850] hidden -translate-y-1/2 items-center gap-4 md:flex cursor-pointer">
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
              className={`cursor-pointer font-mono text-sm font-semibold leading-none transition duration-300 hover:text-[#081947] ${
                isActive
                  ? "translate-x-1 text-[#081947]"
                  : "text-[#081947]/35"
              }`}
              aria-label={`Go to learning journey item ${item.order}`}
            >
              {item.order}
            </button>
          )
        })}
      </div>
    </div>
  )
}
