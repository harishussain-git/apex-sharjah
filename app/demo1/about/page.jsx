import Footer from "@/components/home/Footer"
import FAQAccordion from "@/components/ui/FAQAccordion"
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
  { label: "Students", value: "1,200+", Icon: PiStudent },
  { label: "Qualified Teachers", value: "80+", Icon: PiGraduationCap },
  { label: "Years of Excellence", value: "50+", Icon: PiMedal },
  { label: "Awards & Recognitions", value: "25+", Icon: PiTrophy },
]

const values = [
  { title: "Integrity and a Strong Moral Compass", Icon: PiShieldCheck },
  { title: "Empathy", Icon: PiHeart },
  { title: "Pursuit of Excellence", Icon: PiMedal },
  { title: "Innovation and Creativity", Icon: PiLightbulb },
  { title: "Collaboration and Respect", Icon: PiUsersThree },
]

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

        .text-animation {
          color: #081947;
          animation: textSlideUp 0.85s ease-out both;
        }

        .text-animation-light {
          animation: textSlideUp 0.85s ease-out both;
        }

        .image-zoom-animation {
          animation: imageZoomIn 1.4s ease-out both;
        }
      `}</style>

      <section className="w-full bg-white text-[#081947]">
        <div className="relative">
          <div className=" w-full md:h-[420px] absolute top-0 left-0">
            <p className="text-animation-light max-w-7xl px-8 text-white mx-auto font-accent text-7xl mt-32 w-full">About us</p>
          </div>
          <img
            src="/contact/contact-banner.webp"
            alt="Apex Vision Model School campus"
            className="image-zoom-animation h-[260px] w-full bg-gray-100 object-cover shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:h-[420px]"
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[28%_72%]">
            <div className="flex items-start gap-5">
              <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
              <p className="font-semibold">About</p>
            </div>

            <div>
              <h2 className="text-animation max-w-4xl text-4xl font-semibold leading-tight  tracking-tight md:text-4xl">
                Apex Vision Model School is a forward-thinking learning community
                dedicated to excellence in education and character development.
                We empower students to explore their potential and make a
                positive impact in the world.
              </h2>
              <p className="mt-16 max-w-3xl text-base font-semibold leading-8 text-slate-700">
                We combine academic rigor with innovation, creativity, and
                compassion to prepare future-ready learners for a dynamic world.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[28px] bg-gray-100 p-9">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl">
                  <item.Icon />
                </span>
                <p className="mt-10 font-semibold">{item.label}</p>
                <p className="mt-8 text-5xl font-semibold tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <div className="grid gap-14 lg:grid-cols-[28%_14%_58%] lg:items-start">
              <div className="flex items-start gap-5">
                <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
                <p className="font-semibold">Our Vision</p>
              </div>
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl">
                <PiEye />
              </span>
              <p className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight">
                To inspire and empower future-ready learners with the skills to
                thrive in a dynamic world, live with integrity and empathy, and
                contribute meaningfully to a global society.
              </p>
            </div>

            <div className="mt-24 grid gap-14 lg:grid-cols-[28%_14%_58%] lg:items-start">
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
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-start gap-5">
            <span className="mt-2 h-3 w-3 rounded-full bg-[#081947]" />
            <p className="font-semibold">Core Values</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-5">
            {values.map((item, index) => (
              <div
                key={item.title}
                className={`text-center md:px-8 ${index > 0 ? "md:border-l md:border-slate-200" : ""
                  }`}
              >
                <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-4xl">
                  <item.Icon />
                </span>
                <p className="mt-8 text-lg font-semibold leading-7">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-28 text-center text-5xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>

          <FAQAccordion className="mx-auto mt-12 max-w-5xl" />
        </div>
      </section>
      <Footer />
    </>
  )
}
