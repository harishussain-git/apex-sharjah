import {
  PiArrowUpRight,
  PiChartBar,
  PiCheckSquare,
  PiCompass,
  PiGlobeHemisphereEast,
  PiHouseLine,
  PiShieldCheck,
  PiUserFocus,
} from "react-icons/pi"

const points = [
  { icon: PiHouseLine, label: "Strong Leadership & Governance" },
  { icon: PiChartBar, label: "Long-Term Educational Planning" },
  { icon: PiCheckSquare, label: "Value-Driven Education" },
  { icon: PiUserFocus, label: "Student-Centric Approach" },
  { icon: PiShieldCheck, label: "Safe & Structured Environment" },
  { icon: PiGlobeHemisphereEast, label: "Community & Family Alignment" },
  { icon: PiCompass, label: "Modern, Purposeful Learning" },
  { icon: PiArrowUpRight, label: "Prepared for the Future" },
]

export default function MoreDetails() {
  return (
    <section
      id="more-details"
      className="relative overflow-hidden bg-[#6670c8] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_68%_48%,rgba(65,78,190,0.3),transparent_24%),radial-gradient(circle_at_85%_84%,rgba(255,255,255,0.14),transparent_18%),linear-gradient(180deg,#7983d7_0%,#616bc6_52%,#4f59b6_100%)]" />
      <div className="absolute left-[14%] top-[20%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[12%] right-[10%] h-64 w-64 rounded-full bg-[#8f96ea]/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-16 xl:px-20">
        <div className="max-w-3xl">
          <p className="text-eyebrow mb-8 text-white/85 md:mb-12">More Than A School</p>

          <h2 className="md:max-w-[16ch] font-accent text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[0.94] tracking-[-0.05em] text-white">
            We know what truly shapes a child&apos;s future
          </h2>

          <p className="mt-10 md:max-w-[42ch] text-[clamp(1.1rem,1.2vw,1.7rem)] leading-[1.45] text-white/90 md:mt-14">
            Education is not just about classrooms and exams. It is about
            leadership, environment, values, and long-term thinking.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:pl-6">
          

          <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4 text-white/92">
                <Icon className="shrink-0 text-[2rem] text-white/75" />
                <p className="text-[clamp(1.05rem,1.15vw,1.55rem)] leading-[1.25]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
