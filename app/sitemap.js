import { SITE_URL } from "@/lib/seo"

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/admission", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
]

export default function sitemap() {
  return routes.map(({ path, ...route }) => ({
    url: new URL(path, SITE_URL).toString(),
    ...route,
  }))
}
