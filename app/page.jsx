import HomePage from "@/components/home/HomePage"
import { WEBSITE_STRUCTURED_DATA } from "@/lib/seo"

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE_STRUCTURED_DATA).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  )
}
