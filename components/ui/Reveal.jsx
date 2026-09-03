"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./Reveal.module.css"

export default function Reveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setIsVisible(true)
        observer.unobserve(element)
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={elementRef}
      className={`${styles.reveal} ${isVisible ? styles.visible : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
