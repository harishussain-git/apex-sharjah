import { createPageMetadata, PAGE_SEO } from "@/lib/seo"

export const metadata = createPageMetadata(PAGE_SEO.admission)

export default function AdmissionLayout({ children }) {
  return children
}
