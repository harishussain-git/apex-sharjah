"use client"
import Copy from "../ui/Copy"


export default function HeroContent() {


  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-center">

      <div className="mx-auto mt-30 flex max-w-4xl flex-col items-center gap-6 text-center">

        <Copy>
          <p className="text-eyebrow">45 Years of educational excellence</p>
        </Copy>

        <Copy>

          <h1 className="text-display text-balance uppercase tracking-tight">
            Education that shapes character and confidence
          </h1>
        </Copy>

        <Copy>

          <p className="hidden max-w-2xl text-body-lg text-neutral-600 md:block">
            We guide students through a thoughtful journey, balancing academic excellence, moral grounding, family values, and the skills needed for the modern world.
          </p>
        </Copy>

      </div>

    </div >
  )
}
