"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import featuresData from "../../content/features.json"
import FeatureCardDrawer from "./features/FeatureCardDrawer"

gsap.registerPlugin(ScrollTrigger)

const slides = featuresData.features.map((item, index) => ({
  id: `${item.eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
  ...item,
  items:
    item.items ??
    item.points.map((point) => ({
      title: point,
      text: item.intro,
      image: item.image,
    })),
}))

const clamp = gsap.utils.clamp(0, 1)
const fadeWindow = 0.12
const scrollLengthPerSlide = 1.08

const getSlideOpacity = (position, index, lastIndex) => {
  const fadeInStart = index - fadeWindow
  const fadeOutStart = index + (1 - fadeWindow)
  const fadeOutEnd = index + 1

  if (index === 0) {
    if (position <= fadeOutStart) return 1
    if (position < fadeOutEnd) return 1 - (position - fadeOutStart) / fadeWindow
    return 0
  }

  if (index === lastIndex) {
    if (position <= fadeInStart) return 0
    if (position < index) return (position - fadeInStart) / fadeWindow
    return 1
  }

  if (position <= fadeInStart || position >= fadeOutEnd) return 0
  if (position < index) return (position - fadeInStart) / fadeWindow
  if (position <= fadeOutStart) return 1
  return 1 - (position - fadeOutStart) / fadeWindow
}

export default function SliderFeatures() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const progressRef = useRef(null)
  const imageRefs = useRef([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const progress = progressRef.current
    const images = imageRefs.current.filter(Boolean)
    if (!section || !progress || !images.length) return

    gsap.set(images, { opacity: 0, scale: 1.14 })
    gsap.set(images[0], { opacity: 1, scale: 1 })
    gsap.set(progress, { scaleY: 0, transformOrigin: "top top" })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () =>
          `+=${window.innerHeight * Math.max(slides.length - 1, 1) * scrollLengthPerSlide}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const position = self.progress * (slides.length - 1)
          const lastIndex = slides.length - 1
          let strongestIndex = 0
          let strongestOpacity = -1

          images.forEach((image, index) => {
            const strength = clamp(getSlideOpacity(position, index, lastIndex))

            if (strength > strongestOpacity) {
              strongestOpacity = strength
              strongestIndex = index
            }

            gsap.set(image, {
              opacity: strength,
              scale: 1.12 - strength * 0.12,
            })
          })

          gsap.set(progress, { scaleY: self.progress })
          setActiveSlide((current) => (current === strongestIndex ? current : strongestIndex))
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current.children,
      { y: 28, autoAlpha: 0, filter: "blur(6px)" },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.02,
        ease: "linear",
        overwrite: true,
      },
    )
  }, [activeSlide])

  const slide = slides[activeSlide]

  return (
    <>
      <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#0b1220] text-white">
        <div className="absolute inset-0">
          {slides.map((item, index) => (
            <div
              key={item.id}
              ref={(node) => {
                imageRefs.current[index] = node
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 100%), url(${item.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full px-6 py-8 md:px-12">
          <div
            key={slide.id}
            ref={contentRef}
            className="flex h-full max-w-[640px] flex-col justify-between space-y-5 py-24 md:space-y-6"
          >
            <div>
              <div className="flex items-center gap-3 text-white/90">
                <span className="grid size-5 place-items-center rounded-sm border border-white/60">
                  <span className="block size-2 rounded-[2px] border border-white/70" />
                </span>
                <p className="text-eyebrow text-white/85">{slide.eyebrow}</p>
              </div>

              <h2 className="max-w-[32ch] pt-4 font-accent text-4xl font-semibold uppercase text-white md:text-5xl">
                {slide.title}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <p className="max-w-xl text-body-lg text-white/86">{slide.intro}</p>

              <div className="text-white">
                <p className="text-body-lg">{slide.metric}</p>
                <p className="text-body font-normal text-white/82">{slide.metricLabel}</p>
              </div>

              <div className="space-y-2 pt-1 text-body text-white/84">
                {slide.points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0b1220] transition hover:bg-white/90"
              >
                Read more
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3 md:right-10">
            <div className="relative h-32 w-px bg-white/15 md:h-88">
              <div ref={progressRef} className="absolute inset-x-0 top-0 h-full bg-white/80" />
            </div>

            <div className="space-y-2 text-right text-xs font-medium tracking-[0.18em] text-white/30 md:text-sm">
              {slides.map((item, index) => (
                <div key={item.id} className={index === activeSlide ? "text-white" : ""}>
                  {String(index + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureCardDrawer data={slide} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
