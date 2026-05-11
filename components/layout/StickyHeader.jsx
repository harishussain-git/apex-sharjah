"use client"

import Image from "next/image"
import Link from "next/link"
import ContactPopup from "../ui/ContactPopup"
import FullscreenMenu from "../ui/FullscreenMenu"

export default function StickyHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1000] text-body">
      <div className="pointer-events-auto flex items-center justify-between px-4 py-2 md:px-8 md:py-5">
        {/* Logo */}
        <Link href="/" aria-label="Apex homepage" className="inline-flex items-center">
          <Image
            src="/home/apex-logo-big.webp"
            alt="Apex"
            width={160}
            height={54}
            priority
            className="w-32 md:w-36"
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Desktop Contact */}
          <div className="hidden md:block">
            <ContactPopup
              label="Contact"
              variant="link"
              className="font-bold cursor-pointer transition hover:text-[var(--color-primary-500)]"
            />
          </div>

          {/* Desktop Book Admission */}
          <div className="hidden md:block">
            <ContactPopup
              label="Book Admission"
              variant="button"
              className="inline-flex min-h-12 items-center rounded-full  px-7 hover:cursor-pointer"
            />
          </div>

          {/* Hamburger - Mobile + Desktop */}
          <FullscreenMenu />
        </div>
      </div>
    </header>
  )
}