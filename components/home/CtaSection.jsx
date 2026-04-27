import {
  PiArrowRight,
  PiCalendarDots,
  PiChatCircleDots,
  PiCheckCircleFill,
  PiGraduationCap,
} from "react-icons/pi"

const cards = [
  {
    title: "Have Questions?\nWe’re Here to Help",
    text: "Explore answers to the most common questions about our school, programs, and admission process.",
    icon: PiChatCircleDots,
    iconWrap: "bg-[#8f7cff]/22 text-[#5e4dff]",
    cardClass:
      "bg-[#f5f4ff] text-[#222f7f] lg:-rotate-[6deg] lg:translate-y-5 lg:hover:-rotate-[4deg] lg:hover:-translate-y-1",
    lineClass: "bg-[#d8d2ff]",
    bulletClass: "border-[#7c67ff] text-[#7c67ff]",
    buttonClass: "border-[#8d7bff] text-[#5e4dff]",
    points: [
      "What curriculum do you follow?",
      "What are the school timings?",
      "How can I schedule a campus tour?",
      "What co-curricular activities are available?",
    ],
    cta: "View FAQs",
  },
  {
    title: "Admissions\nOpen for 2026–27",
    text: "Join a community that nurtures curiosity, creativity, and character. Limited seats available across all grades.",
    icon: PiGraduationCap,
    iconWrap: "bg-white/16 text-white",
    cardClass:
      "bg-[linear-gradient(180deg,#4d57f5_0%,#2c33c8_100%)] text-white lg:-translate-y-4 lg:hover:-translate-y-7",
    lineClass: "bg-white/18",
    bulletClass: "bg-white/18 text-white",
    buttonClass: "bg-white text-[#3d45dc]",
    points: [
      "Playgroup to Grade 12",
      "Holistic Learning Approach",
      "World-Class Facilities",
    ],
    cta: "Apply Now",
    featured: true,
  },
  {
    title: "Schedule a\nCampus Tour",
    text: "Experience Apex Vision Model School firsthand. Book a personalised tour for you and your family.",
    icon: PiCalendarDots,
    iconWrap: "bg-[#b8dd8d]/28 text-[#75a848]",
    cardClass:
      "bg-[#f9fff2] text-[#34424b] lg:rotate-[6deg] lg:translate-y-6 lg:hover:rotate-[4deg] lg:hover:translate-y-1",
    lineClass: "bg-[#dbe7c9]",
    bulletClass: "border-[#8dbc62] text-[#7eac5b]",
    buttonClass: "border-[#93bd6d] text-[#75a848]",
    points: [
      "Explore our campus",
      "Meet our educators",
      "Learn about our programs",
    ],
    cta: "Book a Tour",
  },
]

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] px-6 py-18 md:px-10 lg:px-16 xl:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,103,207,0.08),transparent_26%),radial-gradient(circle_at_bottom,rgba(126,192,87,0.08),transparent_18%)]" />
      <div className="relative mx-auto max-w-[1460px]">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-0 lg:[perspective:1400px]">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className={`relative overflow-hidden rounded-[2rem] px-7 py-8 shadow-[0_20px_60px_rgba(45,58,120,0.12)] transition-[transform,box-shadow] duration-300 lg:min-h-[640px] lg:px-8 lg:py-9 lg:hover:scale-[1.02] transition-all lg:hover:shadow-[0_28px_80px_rgba(45,58,120,0.18)] ${card.cardClass}`}
              >
                <div className="flex h-full flex-col">
                  <div
                    className={`grid size-16 place-items-center rounded-full text-[1.8rem] lg:size-[4.5rem] ${card.iconWrap}`}
                  >
                    <Icon />
                  </div>

                  <h3 className="mt-7 whitespace-pre-line font-accent text-[clamp(2.2rem,2.5vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
                    {card.title}
                  </h3>

                  <div className={`mt-7 h-px w-full ${card.lineClass}`} />

                  <p className="mt-7 text-[clamp(1rem,0.95vw,1.2rem)] leading-[1.55] opacity-90">
                    {card.text}
                  </p>

                  <div className="mt-7 space-y-3.5">
                    {card.points.map((point) => (
                      <div key={point} className="flex items-start gap-4">
                        <span
                          className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full border ${card.bulletClass}`}
                        >
                          {card.featured ? (
                            <PiCheckCircleFill className="text-base" />
                          ) : (
                            <PiArrowRight className="text-base" />
                          )}
                        </span>
                        <span className="text-[clamp(1rem,1.05vw,1.3rem)] leading-[1.45]">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      className={`inline-flex min-w-[210px] items-center justify-center gap-4 rounded-full border px-6 py-3.5 text-base font-medium transition hover:translate-x-1 ${card.buttonClass} ${card.featured ? "border-white/0 hover:bg-white/92" : "bg-transparent hover:bg-white/60"}`}
                    >
                      <span>{card.cta}</span>
                      <PiArrowRight className="text-xl" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
