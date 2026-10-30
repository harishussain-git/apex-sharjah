import { notFound } from "next/navigation"
import SeoDesign1 from "@/components/ui/SeoDesign1"
import seoPages from "@/content/seo.json"
import { SITE_URL } from "@/lib/seo"
import StructuredData from "@/components/seo/StructuredData"
import { CBSE_SCHOOL_SLUG, CBSE_SCHOOL_STRUCTURED_DATA } from "@/lib/structuredData"

function getSeoPage(slug) {
  return seoPages.find((page) => page.slug === slug)
}

export function generateStaticParams() {
  return seoPages.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getSeoPage(slug)

  if (!page) notFound()

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: {
      canonical: new URL(`/${page.slug}`, SITE_URL).toString(),
    },
  }
}

export default async function SeoLocationPage({ params }) {
  const { slug } = await params
  const page = getSeoPage(slug)

  if (!page) notFound()

  return (
    <>
      {slug === CBSE_SCHOOL_SLUG && (
        <StructuredData id="cbse-school-structured-data" data={CBSE_SCHOOL_STRUCTURED_DATA} />
      )}
      <SeoDesign1 page={page} />
    </>
  )
}
