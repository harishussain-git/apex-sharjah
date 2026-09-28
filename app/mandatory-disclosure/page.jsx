import Link from "next/link"
import { PiDownloadSimpleBold, PiFilePdf } from "react-icons/pi"
import SiteFooter from "@/components/layout/SiteFooter"
import disclosure from "@/content/disclosure.json"
import { createPageMetadata } from "@/lib/seo"

const { metadata: disclosureMetadata, page, documents } = disclosure

export const metadata = createPageMetadata({
  title: disclosureMetadata.title,
  description: disclosureMetadata.description,
  path: disclosureMetadata.canonical,
  absoluteTitle: true,
})

export default function MandatoryDisclosurePage() {
  const availableDocuments = documents.filter(({ file }) => Boolean(file))

  return (
    <>
      <main className="min-h-screen bg-white text-[#081947]">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-28 lg:px-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-4 text-sm text-[#56647e]">
              <li>
                <Link
                  href="/"
                  className="rounded-sm transition hover:text-[#334086] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#334086]"
                >
                  {page.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#334086]">
                /
              </li>
              <li aria-current="page" className="font-medium text-[#334086]">
                {page.breadcrumbCurrent}
              </li>
            </ol>
          </nav>

          <header className="mt-12 md:mt-14">
            <h1 className="max-w-4xl font-accent text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-[#081947]">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52617b] sm:text-xl">
              {page.description}
            </p>
          </header>

          <section
            aria-label={page.sectionLabel}
            className="mt-10 overflow-hidden rounded-[26px] bg-[#f2f5f9] px-4 py-2 sm:mt-12 sm:px-6 md:px-7"
          >
            <ul>
              {availableDocuments.map((document, index) => (
                <li
                  key={document.id}
                  className={index > 0 ? "border-t border-[#d9e0e9]" : undefined}
                >
                  <div className="flex min-h-20 items-center gap-3 py-3 sm:gap-5">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#081947] shadow-[0_4px_16px_rgba(8,25,71,0.04)] sm:size-12"
                      aria-hidden="true"
                    >
                      <PiFilePdf className="size-6" />
                    </span>

                    <h2 className="min-w-0 flex-1 text-base font-bold leading-6 text-[#081947] sm:text-lg">
                      {document.title}
                    </h2>

                    <a
                      href={document.file}
                      download
                      aria-label={`${page.downloadLabel} ${document.title} ${page.fileTypeLabel}`}
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white bg-white px-4 text-sm font-bold text-[#081947] shadow-[0_4px_16px_rgba(8,25,71,0.04)] transition hover:border-[#334086]/20 hover:bg-[#334086] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#334086] sm:min-w-36 sm:px-6"
                    >
                      <span className="hidden sm:inline">{page.downloadLabel}</span>
                      <PiDownloadSimpleBold className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
