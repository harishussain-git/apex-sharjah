"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PiList } from "react-icons/pi";

const links = [
  ["Blog", "/beta"],
  ["Contact", "/section-cards-demo"],
]

function MenuIcon() {
  return (
    <span className="grid w-4 gap-1" aria-hidden="true">
      <span className="h-0.5 rounded-full bg-current" />
      <span className="h-0.5 rounded-full bg-current" />
      <span className="h-0.5 rounded-full bg-current" />
    </span>
  )
}

export default function StickyHeader() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="pointer-events-none fixed inset-x-0  md:top-0 z-[1000] text-body">
      <div className="pointer-events-auto flex   items-center justify-between px-4 py-2 md:px-8">
        <Link href="/" aria-label="Apex homepage">
          <Image src="/home/apex-logo-big.webp" alt="Apex" width={160} height={54} priority className="w-32" />
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <button className="hidden font-bold md:block" type="button">EN</button>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <Link key={label} href={href} className="font-bold transition hover:text-[var(--color-primary-500)]">
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/beta" className="hidden min-h-12 items-center rounded-full bg-white px-7  shadow-[0_12px_26px_rgb(35_73_105_/_12%)] md:inline-flex">
            Book Admission
          </Link>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex text-2xl items-center justify-center rounded-full bg-white shadow-[0_12px_26px_rgb(35_73_105_/_12%)] p-3"
          >
            <PiList />
          </button>
        </div>
        
      </div>

      {open ? (
        <nav className="pointer-events-auto ml-auto mr-3 mt-2 flex max-w-xs flex-col gap-1 rounded-[26px] bg-white/92 p-3 shadow-[0_18px_50px_rgb(35_73_105_/_18%)] backdrop-blur-xl md:mr-5">
          <button className="rounded-2xl px-4 py-3 text-left font-bold md:hidden" type="button">EN</button>
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={close} className="rounded-2xl px-4 py-3 font-bold transition hover:bg-black/5">
              {label}
            </Link>
          ))}
          <Link href="/beta" onClick={close} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-neutral-950 px-6 font-extrabold text-white">
            Book Admission
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
