"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ContactPopup from "./ContactPopup"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Learning Journey", href: "/#learning-journey" },
  { label: "Admission", href: "/#admission" },
  { label: "Contact Us", href: "/#contact" },
]

export default function FullscreenMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-12 items-center justify-center rounded-full bg-white hover:bg-slate-100 cursor-pointer border border-[#343195]/35 "
      >
        <img className="w-6 " src="/icons/menu.svg" alt="menu" />
      </button>

      <div
        className={`fixed inset-0 z-[1300] bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
          }`}
      >
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto] overflow-y-auto md:grid-cols-[44vw_1fr] md:grid-rows-[auto_1fr_auto]">
          <div
            className={`relative hidden overflow-hidden bg-[#0b1220] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:row-span-3 md:block ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
          >
            <Image
              src="/img/menu-video-thumbnail.webp"
              alt="Apex Vision Model School campus"
              fill
              priority
              sizes="44vw"
              className={`object-cover transition-transform duration-[1800ms] ease-out ${open ? "scale-105" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-[#061129]/20" />

            <Link href="/" onClick={() => setOpen(false)} className="absolute left-8 top-8 inline-flex" aria-label="Apex homepage">
              <Image
                src="/home/apex-logo-big.webp"
                alt="Apex"
                width={260}
                height={54}
                priority
                className="w-32 md:w-36"
              />
            </Link>

            <button
              type="button"
              className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-sm font-bold text-white"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 shadow-[0_18px_40px_rgb(0_0_0_/_22%)] backdrop-blur-sm transition hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
              </span>
              Play Showreel
            </button>
          </div>

          <header className="flex items-center justify-between px-6 py-2 md:px-8 md:py-5 md:col-start-2 ">
            <Link href="/" onClick={() => setOpen(false)} className="inline-flex md:hidden" aria-label="Apex homepage">
              <Image src="/home/apex-logo-big.webp" alt="Apex" width={150} height={50} className="h-auto w-28" />
            </Link>

            <div className="ml-auto flex items-center gap-3 sm:gap-6">
              <button type="button" className="hidden text-sm font-bold text-[#343195] transition hover:text-[#111744] sm:inline-flex cursor-pointer">
                العربية
              </button>

              <div className="hidden md:block">

                <ContactPopup
                  label="Get In Touch"
                  variant="button"
                  className="font-bold cursor-pointer transition hover:text-[var(--color-primary-500)]"
                />
              </div>

              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-[#343195]/35 bg-white text-[#343195] transition hover:bg-slate-100  cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex items-center px-5 py-8 sm:px-8 md:col-start-2 md:px-20 md:py-12 lg:px-28">
            <nav aria-label="Main menu" className="w-full">
              <ul className="space-y-2 sm:space-y-3">
                {menuItems.map((item, index) => (
                  <li
                    key={item.label}
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                    style={{ transitionDelay: open ? `${180 + index * 90}ms` : "0ms" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group inline-flex font-accent text-[clamp(3.15rem,14vw,5.75rem)] font-medium uppercase leading-[0.9]  text-black transition hover:text-[#343195] md:text-[clamp(3.75rem,4.2vw,4.6rem)]"
                    >
                      <span className="relative  ">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 h-1 w-0 rounded-full bg-[#354486] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </main>

          <footer className="px-5 pb-8 sm:px-8 md:col-start-2 md:px-20 lg:px-28">
            <div className="mb-7 overflow-hidden rounded-[22px] md:hidden">
              <div
                className={`relative h-32 transition-transform duration-[1400ms] ease-out sm:h-40 ${open ? "scale-105" : "scale-100"
                  }`}
              >
                <Image
                  src="/img/menu-video-thumbnail.webp"
                  alt="Apex Vision Model School campus"
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                <button type="button" className="absolute inset-0 grid place-items-center text-xs font-bold text-white cursor-pointer">
                  <span className="inline-flex flex-col items-center gap-1">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/10 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                      </svg>
                    </span>
                    Play Showreel
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 text-sm font-bold text-slate-500 sm:flex-row sm:items-center sm:gap-10">
              <a href="tel:+97141234567" className="inline-flex items-center gap-3 transition hover:text-[#343195]">
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#343195]/25 text-[#343195]">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <path d="M8.5 5.5 6.8 3.8a1.8 1.8 0 0 0-2.6 0l-.9.9c-.9.9-.8 2.4.1 3.8a29 29 0 0 0 12.1 12.1c1.4.9 2.9 1 3.8.1l.9-.9a1.8 1.8 0 0 0 0-2.6l-1.7-1.7a1.8 1.8 0 0 0-2.4-.2l-1.1.8a18.5 18.5 0 0 1-7.1-7.1l.8-1.1a1.8 1.8 0 0 0-.2-2.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                +971 4 123 4567
              </a>

              <span className="hidden h-8 w-px bg-slate-200 sm:block" />

              <a href="mailto:info@apexschool.ae" className="inline-flex items-center gap-3 transition hover:text-[#343195]">
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-[#343195]/25 text-[#343195]">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                info@apexschool.ae
              </a>
            </div>

            <p className="pt-6 text-sm font-bold text-slate-400">© 2026 Apex Vision Model School. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  )
}
