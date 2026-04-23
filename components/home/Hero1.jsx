import React from 'react'
import HeroContent from './HeroContent'

export default function Hero() {
  return (
    <section className=" text-neutral-950 ">
      <div className=" realtive">

        <div>
          <img className="relative top-0 left-0 w-full min-h-screen object-cover" src="/home/hero.webp" alt="Education excellence" />
        </div>

        <HeroContent />



      </div>
    </section>
  )
}
