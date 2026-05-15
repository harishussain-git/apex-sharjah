"use client"

export default function HeroContent() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-center text-white">
      <div className="mx-auto mt-30 md:mt-24 flex max-w-4xl flex-col items-center gap-2 text-center">

        <div className="hero-badge flex justify-center items-center gap-2">
          
            <img className="w-9" src="/home/45.webp" alt="45 Years of Educational Excellence" />
          <p className="text-eyebrow">Years of educational excellence</p>
        </div>

        <h1 className="hero-title text-display md:text-balance uppercase tracking-tight px-4">
          Education that shapes character and confidence
        </h1>

        <p className="hero-copy hidden max-w-2xl text-body-lg mt-3 md:block">
          We guide students through a thoughtful journey, balancing academic excellence, moral grounding, family values, and the skills needed for the modern world.
        </p>
      </div>

      <style jsx>{`
        .hero-badge,
        .hero-title,
        .hero-copy {
          animation: heroContentIn 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-badge {
          animation-delay: 420ms;
        }

        .hero-symbol {
          animation: heroSymbolPulse 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 360ms;
        }

        .hero-title {
          animation-delay: 560ms;
        }

        .hero-copy {
          animation-delay: 730ms;
        }

        @keyframes heroContentIn {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0) scale(0.96);
            filter: blur(12px);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes heroSymbolPulse {
          0% {
            opacity: 0;
            transform: scale(0.72) rotate(-8deg);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
          55% {
            opacity: 1;
            transform: scale(1.08) rotate(0deg);
            box-shadow: 0 0 0 18px rgba(255, 255, 255, 0.1);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div >
  )
}
