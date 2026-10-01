import Image from "next/image"
import SiteFooter from "@/components/layout/SiteFooter"

export default function SeoDesign1({ page }) {
  return (
    <>
      <main>
        <section className="relative min-h-[100svh] overflow-hidden bg-white text-[#10213e]">
          <Image
            src="/sequences/home/01-hero/0001.webp"
            alt="Apex Vision Model School campus in Sharjah"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex w-full">
            <div className="mt-25 flex h-fit flex-col gap-1 px-4 text-left md:mt-30 md:max-w-xl md:px-10 lg:mt-40 lg:max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="relative block size-9 shrink-0">
                  <Image
                    src="/home/45.webp"
                    alt="45 Years of Educational Excellence"
                    fill
                    sizes="36px"
                    className="object-contain"
                  />
                </span>
                <p className="text-[clamp(.5rem,1vw+.6rem,.8rem)] font-semibold uppercase tracking-wider">
                  Years of educational excellence
                </p>
              </div>

              <h1 className="font-accent text-4xl font-bold uppercase tracking-tight md:text-5xl md:leading-12 lg:text-6xl lg:leading-14">
                {page.h1}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-[clamp(.7rem,1vw+.7rem,.9rem)] lg:mt-4">
                {page.description}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
