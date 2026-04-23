"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Copy({ children, animateOnScroll = true, delay = 0 }) {
  const containerRef = useRef(null)
  const elementRef = useRef([])
  const splitRef = useRef([])
  const lines = useRef([])

  useGSAP(
    () => {
      if (!containerRef.current) return

      splitRef.current = []
      elementRef.current = []
      lines.current = []

      let elements = []

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children)
      } else {
        elements = [containerRef.current]
      }

      elements.forEach((el, index) => {
        elementRef.current.push(el)

        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line++" })
        splitRef.current.push(split)
        const computedStyle = window.getComputedStyle(el)
        const textIndent = computedStyle.textIndent

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            split.lines[0].style.paddingLeft = textIndent
          }
          el.style.textIndent = "0px"
        }
        lines.current.push(split.lines)
      })

      gsap.set(lines.current, { y: "100%" })

      const animationProps = {
        y: "0%",
        duration: 2,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      }

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        })
      } else {
        gsap.to(lines.current, animationProps)
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split) split.revert()
        })
      }
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    },
  )

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  )
}
