import Image from "next/image"
import { PiArrowUpRight, PiEnvelopeSimple, PiMapPin, PiPhone } from "react-icons/pi"

const footerLinks = [
  {
    title: "Explore",
    links: ["About School", "Admissions", "Campus Life", "Programs"],
  },
  {
    title: "Resources",
    links: ["FAQs", "School Calendar", "Parent Guide", "Contact"],
  },
]

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0b1220] text-white">
      <div className="mx-auto max-w-[1600px] px-6 md:pt-48 py-14 md:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr] lg:gap-10">
          <div className="max-w-md">
            <Image
              src="/home/apex-logo-white.svg"
              alt="Apex Vision Model School"
              width={170}
              height={52}
              className="h-auto w-[150px] md:w-[170px]"
            />

            <p className="mt-6 text-body text-white/72">
              A modern school environment where academic strength, values,
              creativity, and confidence grow together.
            </p>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <span>Book Admission</span>
              <PiArrowUpRight className="text-base" />
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-eyebrow text-white/55">Visit</p>
            <div className="flex items-start gap-3 text-white/78">
              <PiMapPin className="mt-1 shrink-0 text-lg text-white/60" />
              <p className="text-body">
                Apex Vision Model School, Sharjah
                <br />
                United Arab Emirates
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/78">
              <PiPhone className="shrink-0 text-lg text-white/60" />
              <a href="tel:+971600000000" className="text-body transition hover:text-white">
                +971 600 000 000
              </a>
            </div>
            <div className="flex items-center gap-3 text-white/78">
              <PiEnvelopeSimple className="shrink-0 text-lg text-white/60" />
              <a
                href="mailto:admissions@apexschool.ae"
                className="text-body transition hover:text-white"
              >
                admissions@apexschool.ae
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-eyebrow text-white/55">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-body text-white/78 transition hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-5 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Apex Vision Model School. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white/80">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white/80">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
