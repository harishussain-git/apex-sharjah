import SiteFooter from "@/components/layout/SiteFooter"
import FAQAccordion from "@/components/ui/FAQAccordion"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import Reveal from "@/components/ui/Reveal"
import Image from "next/image"
import { createPageMetadata } from "@/lib/seo"
import {
  PiEye,
  PiGraduationCap,
  PiHeart,
  PiLightbulb,
  PiMedal,
  PiShieldCheck,
  PiStudent,
  PiTarget,
  PiTrophy,
  PiUsersThree,
} from "react-icons/pi"

const stats = [
  { label: "Students", value: 20000, suffix: "+", Icon: PiStudent },
  { label: "Qualified Teachers", value: 400, suffix: "+", Icon: PiGraduationCap },
  { label: "Years of Excellence", value: 45, suffix: "+", Icon: PiMedal },
  { label: "Awards & Recognitions", value: 25, suffix: "+", Icon: PiTrophy },
]

const values = [
  { title: "Integrity and a Strong Moral Compass", Icon: PiShieldCheck },
  { title: "Empathy", Icon: PiHeart },
  { title: "Pursuit of Excellence", Icon: PiMedal },
  { title: "Innovation and Creativity", Icon: PiLightbulb },
  { title: "Collaboration and Respect", Icon: PiUsersThree },
]

export const metadata = createPageMetadata({
  title: "About Our School",
  description:
    "Learn about Apex Vision Model School, a forward-thinking learning community dedicated to excellence in education, character development, innovation, creativity, and compassion.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes textSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageZoomIn {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }

        .text-animation-light {
          animation: textSlideUp 0.85s ease-out both;
        }

        .image-zoom-animation {
          animation: imageZoomIn 1.4s ease-out both;
        }
      `}</style>

      <section className="w-full bg-white text-[#081947]">
        <div className="relative h-[260px] bg-gray-100 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:h-[420px]">
          <div className="absolute left-0 top-0 z-10 w-full md:h-[420px]">
            <h1 className="text-animation-light max-w-7xl px-8 text-white mx-auto font-accent text-7xl mt-32 w-full">About us</h1>
          </div>
          <Image
            src="/img/menu-video-thumbnail2.webp"
            alt="Apex Vision Model School campus"
            fill
            priority
            sizes="100vw"
            className="image-zoom-animation object-cover"
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal className="grid gap-12 lg:grid-cols-[28%_72%]">
            <div className="flex items-start gap-5">
              <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
              <p className="font-semibold">About</p>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-4xl">
                Apex Vision Model School is a forward-thinking learning community
                dedicated to excellence in education and character development.
                We empower students to explore their potential and make a
                positive impact in the world.
              </h2>
              <p className="mt-16 max-w-3xl text-base font-semibold leading-8 text-slate-700">
                The NIMS Group UAE is a prominent educational network established in 1980 by Dr. M.K. Kamaluddin under the Manarul Huda Trust to provide affordable, modern education to the Indian community in the United Arab Emirates.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-20 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end md:gap-0">
            <div>
              <p className="text-[#374386] uppercase text-xs tracking-widest font-bold pb-2">NIMS Group network at a glance.</p>
              <p>Representing the combined impact of all NIMS Group institutions, including Apex Vision Model School.</p>
            </div>
            <img src="/img/nims-logo.webp" alt="NIMS Group network at a glance" className="w-24 mr-12" />

          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 80}
                className="rounded-[28px] bg-gray-100 p-9"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl">
                  <item.Icon />
                </span>
                <p className="mt-10 font-semibold">{item.label}</p>
                <p className="mt-8 text-5xl font-semibold tracking-tight tabular-nums">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="bg-slate-50">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <Reveal className="grid gap-14 lg:grid-cols-[28%_14%_58%] lg:items-start">
              <div className="flex items-start gap-5">
                <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
                <p className="font-semibold">Our Vision</p>
              </div>
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl">
                <PiEye />
              </span>
              <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight">
                To inspire and empower future-ready learners with the skills to
                thrive in a dynamic world, live with integrity and empathy, and
                contribute meaningfully to a global society.
              </p>
            </Reveal>

            <Reveal className="mt-24 grid gap-14 lg:grid-cols-[28%_14%_58%] lg:items-start">
              <div className="flex items-start gap-5">
                <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
                <p className="font-semibold">Our Mission</p>
              </div>
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl">
                <PiTarget />
              </span>
              <p className="max-w-3xl text-2xl font-semibold leading-10 tracking-tight">
                Our mission is to nurture a supportive and inclusive learning
                community where innovation, creativity, and collaboration are at
                the heart of teaching. We commit to equipping every student with
                the skills, values, and mindset needed to excel in an
                ever-changing world, through forward-thinking pedagogy and a
                culture of mutual respect.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <Reveal className="flex items-start gap-5">
            <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
            <p className="font-semibold">Core Values</p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-5">
            {values.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 80}
                className={`text-center md:px-8 ${index > 0 ? "md:border-l md:border-slate-200" : ""
                  }`}
              >
                <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-4xl">
                  <item.Icon />
                </span>
                <p className="mt-8 text-lg font-semibold leading-7">
                  {item.title}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal
            as="h2"
            className="mt-28 text-center text-5xl font-semibold tracking-tight"
          >
            Frequently Asked Questions
          </Reveal>

          <Reveal delay={100}>
            <FAQAccordion className="mx-auto mt-12 max-w-5xl" />
          </Reveal>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
