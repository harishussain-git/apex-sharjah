export const SITE_NAME = "Apex Vision Model School"
export const SITE_URL = new URL("https://www.apexsharjah.com")

export const SOCIAL_IMAGE = {
  url: "/sequences/home/01-hero/0001.webp",
  width: 2752,
  height: 1536,
  alt: "Apex Vision Model School campus in Sharjah",
}

export function createPageMetadata({ title, description, path, absoluteTitle = false }) {
  const canonicalUrl = new URL(path, SITE_URL).toString()
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
  }
}
