"use client"

export default function HeroContent() {


  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-center text-white">

      <div className="mx-auto mt-30 md:mt-24 flex max-w-4xl flex-col items-center gap-2 text-center">
        
        <div className="flex justify-center items-center gap-2">
          <img className="w-10" src="home/45.webp" alt="45 Years of Educational Excellence" />
          <p className="text-eyebrow">Years of educational excellence</p>
        </div>

        <h1 className="text-display md:text-balance  uppercase tracking-tight px-4">
          Education that shapes character and confidence
        </h1>

        <p className="hidden max-w-2xl text-body-lg mt-3 md:block">
          We guide students through a thoughtful journey, balancing academic excellence, moral grounding, family values, and the skills needed for the modern world.
        </p>


      </div>

    </div >
  )
}
