export default function Hero() {
  return (
    <section className="bg-white min-h-screen px-6 py-24 text-neutral-950 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <span className="w-fit rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
          Homepage System
        </span>

        <div className="max-w-4xl space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-7xl">
            A simple scroll-driven homepage foundation that is easy to ship and easy to grow.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
            One pinned sequence. One anchor config. One overlay system. Enough structure to feel
            production-minded without turning the homepage into a framework.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#features"
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            See the sequence
          </a>
          <a
            href="#details"
            className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            Explore structure
          </a>
        </div>
      </div>
    </section>
  )
}
