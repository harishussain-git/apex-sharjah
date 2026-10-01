import { notFound } from "next/navigation"
import SeoDesign1 from "@/components/ui/SeoDesign1"
import seoPages from "@/content/seo.json"

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
  }
}

export default async function SeoLocationPage({ params }) {
  const { slug } = await params
  const page = getSeoPage(slug)

  if (!page) notFound()

  return <SeoDesign1 page={page} />
}
