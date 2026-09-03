import Image from "next/image"
import Link from "next/link"
import { PiArrowUpRight, PiMapPin, PiPhone } from "react-icons/pi"
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contactDetails"

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "About School", href: "/about" },
      {
        label: "Admissions",
        href: "https://bmark.nimsuae.com/bm-school/Docme-UI/online-registration?c2Nob29sX2lk=MjI=",
        newTab: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Contact", href: "/contact" }],
  },
]

const schoolAddress =
  "Plot # 2028/A, Street 129, Al Sabkha, Al Riqa Suburb, Sharjah, UAE"
const schoolMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolAddress)}`

export default function SiteFooter() {
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

            <Link
              href="https://bmark.nimsuae.com/bm-school/Docme-UI/online-registration?c2Nob29sX2lk=MjI="
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <span>Book Admission</span>
              <PiArrowUpRight aria-hidden="true" className="text-base" />
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-eyebrow text-white/55">Visit</p>
            <address className="flex items-start gap-3 not-italic text-white/78">
              <PiMapPin aria-hidden="true" className="mt-1 shrink-0 text-lg text-white/60" />
              <a
                href={schoolMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body transition hover:text-white"
              >
                {schoolAddress}
              </a>
            </address>
            <div className="flex items-center gap-3 text-white/78">
              <PiPhone aria-hidden="true" className="shrink-0 text-lg text-white/60" />
              <a href={CONTACT_PHONE_HREF} className="text-body transition hover:text-white">
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-eyebrow text-white/55">{group.title}</p>
              <div className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    className="block text-body text-white/78 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 text-sm text-white/45">
          <p>&copy; 2026 Apex Vision Model School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
