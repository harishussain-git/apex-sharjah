"use client"

import HoneypotField from "./HoneypotField"
import useFormSubmission from "@/hooks/useFormSubmission"
import { FORM_OPTIONS } from "@/lib/forms/formDefinitions"

const inputClass =
  "w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-sm text-slate-950 outline-none placeholder:text-gray-500 focus:border-[#081947] focus:ring-0"

export default function ContactPageForm() {
  const { isSubmitting, isSuccess, message, submit } = useFormSubmission()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const result = await submit("contact-page", form)

    if (result.success) form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-4">
      <HoneypotField />

      <input
        className={inputClass}
        name="studentName"
        type="text"
        placeholder="Name of Student"
        required
        maxLength={100}
      />

      <select className={inputClass} name="inquiryType" defaultValue="" required>
        <option value="" disabled>
          Inquiry Type
        </option>
        {FORM_OPTIONS.inquiryType.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        className={inputClass}
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        required
        maxLength={254}
      />
      <input
        className={inputClass}
        name="phone"
        type="tel"
        placeholder="Phone Number"
        autoComplete="tel"
        required
        maxLength={20}
      />
      <textarea
        className={`${inputClass} min-h-28 resize-none`}
        name="message"
        placeholder="Your Message"
        required
        maxLength={2000}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#081947] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#051234] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
