import { PiBuildingsLight, PiHeadsetLight } from "react-icons/pi"

export default function SchoolFront2() {
  return (
    <section
      id="school-front"
      className="relative h-screen overflow-hidden px-5 pt-24 md:px-10 md:pt-28"
    >
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white/88 via-white/68 to-transparent md:w-[40%]" />

      <div className="relative z-10 flex h-full items-start">
        <div className="flex max-w-[42rem] flex-col items-start gap-4 ">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/70 ">
            <PiBuildingsLight className="text-xl text-black" />
            <span>Campus</span>
          </div>

          <div className="h-1 w-18 rounded-full bg-[#8bbaf7]" />

          <h2 className="font-accent text-[clamp(1rem,2vw+1rem,4rem)] font-semibold uppercase leading-14 tracking-tight text-black">
            A welcoming start
            <br />
            to every school day
          </h2>

          <p className="max-w-[34rem] text-lg leading-[1.35] text-[#3c4b66] ">
            Bright, calm spaces help children feel comfortable, confident, and ready to learn.
          </p>

          <a
            href="/demo1/contact"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/70 bg-[#f8b92b] px-6 py-4 text-sm font-semibold text-black shadow-[0_18px_44px_rgba(248,185,43,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <PiHeadsetLight className="text-2xl" />
            <span>Speak with a Counsellor</span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 ">
        <span className="scroll-mouse relative  flex justify-center items-center h-[44px] w-8 rounded-[18px] border-2 border-black/65">
          <span className="scroll-dot absolute top-2 h-3 w-[3px] rounded-full bg-black/65" />
        </span>
        <p className="whitespace-nowrap  font-medium tracking-[-0.02em] ">
          Scroll to explore our facilities
        </p>
      </div>

      <style jsx>{`
        .scroll-dot {
          animation: scrollMouseDot 1.5s infinite;
        }

        @keyframes scrollMouseDot {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(22px);
          }
        }
      `}</style>
    </section>
  )
}
