import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Admissions",
  description:
    "Book admission at Apex Vision Model School in Sharjah. Share your details and the admissions team will contact you about admission from KG1 to Grade 4.",
  path: "/admission",
})

export default function AdmissionLayout({ children }) {
  return children
}
