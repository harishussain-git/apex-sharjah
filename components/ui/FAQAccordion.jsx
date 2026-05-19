"use client"

import { useState } from "react"
import { PiCaretDown } from "react-icons/pi"

const defaultFaqs = [
  {
    question: "Which grades do you offer?",
    answer:
      "We currently offer classes from KG1 to Grade 4, supporting young learners in their early academic journey.",
  },
  {
    question: "What curriculum do you follow?",
    answer:
      "We follow the CBSE curriculum with a balanced focus on academics, creativity, values, and practical learning.",
  },
  {
    question: "What is the admission age for KG1?",
    answer:
      "KG1 admission is generally based on the child’s age as per school and education authority guidelines.",
  },
  {
    question: "How can I apply for admission?",
    answer:
      "Parents can contact the admissions team to check seat availability, required documents, and the next steps.",
  },
  {
    question: "What are the school timings?",
    answer:
      "School timings are shared with parents according to the grade level and academic schedule.",
  },
  {
    question: "Do you provide transport facilities?",
    answer:
      "Yes, school transport is available in selected areas, subject to route availability and confirmation.",
  },
  {
    question: "Is English the medium of instruction?",
    answer:
      "Yes, English is the main medium of instruction, with age-appropriate language support for young learners.",
  },
  {
    question: "How do you support young children?",
    answer:
      "We provide a caring classroom environment with guided learning, play-based activities, and individual attention.",
  },
  {
    question: "Are co-curricular activities included?",
    answer:
      "Yes, students take part in age-appropriate activities that support confidence, creativity, fitness, and teamwork.",
  },
  {
    question: "How do parents receive updates?",
    answer:
      "Parents are kept informed through regular communication from the school regarding academics, events, and important notices.",
  },
];

export default function FAQAccordion({ items = defaultFaqs, defaultOpen = 0, className = "" }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item.question}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setOpenIndex(isOpen ? null : index)
              }
            }}
            className="group cursor-pointer rounded-[24px] bg-slate-50 px-6 py-5 transition duration-300 hover:bg-slate-200 md:px-8 md:py-6"
          >
            <div className="flex w-full items-center justify-between gap-6 text-left">
              <h3 className="text-base font-semibold md:text-lg">
                {item.question}
              </h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm transition duration-300 ease-out group-hover:bg-[#081947] group-hover:text-white">
                <PiCaretDown
                  className={`transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </div>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {item.answer ? (
                  <p className="mt-6 text-base font-medium leading-7 text-slate-700">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
