export const SITE_NAME = "Apex Vision Model School"
export const SITE_URL = new URL("https://www.apexsharjah.com")

export const SOCIAL_IMAGE = {
  url: "/img/opengraph-image.webp",
  width: 1731,
  height: 909,
  alt: "Apex Vision Model School in Sharjah, UAE",
  type: "image/webp",
}

export const SITE_ICONS = {
  // Keep this URL stable: Google caches favicons independently from page HTML.
  // The PNG is a valid 120x120 brand mark, comfortably above Google's 48px recommendation.
  icon: [{ url: "/img/favicon-apex.png", type: "image/png", sizes: "120x120" }],
  shortcut: ["/img/favicon-apex.png"],
}

export const WEBSITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL.toString(),
}

export const GOOGLE_SITE_VERIFICATION =
  "nYgVN_Qjwkroge7eYcIJqq6R6iS0BNTOSGwOkR89EF4"

export const PAGE_SEO = {
  home: {
    title: "Apex Vision Model School Sharjah",
    description:
      "A forward-thinking school in Sharjah nurturing academic excellence, strong values, creativity, confidence, and future-ready learners.",
    path: "/",
    absoluteTitle: true,
  },
  about: {
    title: "About Our School",
    description:
      "Learn about Apex Vision Model School, a forward-thinking learning community dedicated to excellence in education, character development, innovation, creativity, and compassion.",
    path: "/about",
  },
  contact: {
    title: "Contact Us",
    description:
      "Contact Apex Vision Model School in Sharjah for questions about admissions, academics, school life, campus visits, or other enquiries.",
    path: "/contact",
  },
  admission: {
    title: "Admissions",
    description:
      "Book admission at Apex Vision Model School in Sharjah. Share your details and the admissions team will contact you about admission from KG1 to Grade 4.",
    path: "/admission",
  },
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
