"use client"

export default function HeroContent() {


  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-center text-white">

      <div className="mx-auto mt-30 flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="text-eyebrow">45 Years of educational excellence</p>

        <h1 className="text-display text-balance uppercase tracking-tight">
          Education that shapes character and confidence
        </h1>

        <p className="hidden max-w-2xl text-body-lg md:block">
          We guide students through a thoughtful journey, balancing academic excellence, moral grounding, family values, and the skills needed for the modern world.
        </p>


      </div>

    </div >
  )
}
