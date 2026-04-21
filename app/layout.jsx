import "./globals.css"

export const metadata = {
  title: "Apex New",
  description: "Next.js homepage animation starter with GSAP, ScrollTrigger, Lenis, and Tailwind.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-950 antialiased">{children}</body>
    </html>
  )
}
