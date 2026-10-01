import Link from "next/link"
import { PiArrowUpRight, PiEnvelopeSimple, PiPhone } from "react-icons/pi"
import FeeComparison from "@/components/school-fees/FeeComparison"
import GradeFeesAccordion from "@/components/school-fees/GradeFeesAccordion"
import SiteFooter from "@/components/layout/SiteFooter"
import schoolFees from "@/content/school-fees.json"
import { createPageMetadata } from "@/lib/seo"

const { metadata: feesMetadata, page } = schoolFees

export const metadata = createPageMetadata({
  title: feesMetadata.title,
  description: feesMetadata.description,
  path: feesMetadata.canonical,
  absoluteTitle: true,
})

export default function SchoolFeesPage() {
  return (
    <>
      <main className="bg-white text-[#081947]">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-28 lg:px-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-4 text-sm text-[#56647e]">
              <li>
                <Link
                  href="/"
                  className="rounded-sm transition hover:text-[#334086] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#334086]"
                >
                  {page.breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#334086]">
                /
              </li>
              <li aria-current="page" className="font-medium text-[#334086]">
                {page.breadcrumb.current}
              </li>
            </ol>
          </nav>

          <header className="mt-12 md:mt-14 md:flex md:items-end md:justify-between md:gap-10">
            <div>
              <h1 className="max-w-4xl font-accent text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52617b] sm:text-xl">
                {page.description}
              </p>
            </div>
            <p className="mt-3 shrink-0 text-sm font-medium text-[#52617b] md:mb-1 md:mt-0">
              {page.currencyNote}
            </p>
          </header>

          <section aria-labelledby="tuition-fees-heading" className="mt-14 md:mt-20">
            <h2
              id="tuition-fees-heading"
              className="font-accent text-4xl font-semibold leading-none tracking-tight sm:text-5xl"
            >
              {page.tuition.title}
            </h2>
            <div className="mt-6 rounded-[26px] bg-[#f2f5f9] p-3 sm:p-4">
              <GradeFeesAccordion tuition={page.tuition} />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#52617b]">
              {page.tuition.helperText}
            </p>
          </section>

          <section aria-labelledby="transport-fees-heading" className="mt-14 md:mt-20">
            <h2
              id="transport-fees-heading"
              className="font-accent text-4xl font-semibold leading-none tracking-tight sm:text-5xl"
            >
              {page.transport.title}
            </h2>
            <div className="mt-6">
              <FeeComparison
                firstColumnLabel={page.transport.routeLabel}
                approvedLabel={page.transport.approvedLabel}
                discountedLabel={page.transport.discountedLabel}
                rows={page.transport.routes}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#52617b]">
              {page.transport.helperText}
            </p>
          </section>

          <aside
            aria-labelledby="fees-contact-heading"
            className="mt-10 rounded-[26px] bg-[#f2f5f9] p-5 sm:p-7 md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-10 lg:px-10"
          >
            <div>
              <h2 id="fees-contact-heading" className="font-accent text-3xl font-semibold leading-none sm:text-4xl">
                {page.contact.title}
              </h2>
              <p className="mt-2 text-base text-[#52617b]">
                {page.contact.description}
              </p>
            </div>

            <div className="mt-6 border-t border-[#d9e0e9] pt-6 md:mt-0 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <a
                href={page.contact.buttonHref}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#334086] px-6 text-sm font-bold text-white transition hover:bg-[#26346f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#334086]"
              >
                {page.contact.buttonLabel}
                <PiArrowUpRight aria-hidden="true" className="size-4" />
              </a>

              <div className="mt-4 flex flex-col gap-3 text-sm text-[#52617b] sm:flex-row sm:flex-wrap sm:gap-x-6">
                <a
                  href={page.contact.phone.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md transition hover:text-[#081947] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#334086]"
                >
                  <PiPhone aria-hidden="true" className="size-5 shrink-0 text-[#081947]" />
                  {page.contact.phone.label}
                </a>
                <a
                  href={page.contact.email.href}
                  className="inline-flex min-h-11 items-center gap-2 break-all rounded-md transition hover:text-[#081947] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#334086]"
                >
                  <PiEnvelopeSimple aria-hidden="true" className="size-5 shrink-0 text-[#081947]" />
                  {page.contact.email.label}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
