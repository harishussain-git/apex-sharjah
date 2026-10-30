import HomePage from "@/components/home/HomePage"
import { SITE_URL } from "@/lib/seo"

export const metadata = {
  // This page uses an absolute canonical. Avoid metadataBase normalizing its
  // root URL to the bare origin; inherited social metadata is already resolved.
  metadataBase: null,
  alternates: { canonical: SITE_URL.toString() },
}

export default function Page() {
  return <HomePage />
}
