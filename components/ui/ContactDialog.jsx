"use client"

import { useEffect, useId, useState } from "react"
import HoneypotField from "@/components/forms/HoneypotField"
import useFormSubmission from "@/hooks/useFormSubmission"
import { FORM_OPTIONS } from "@/lib/forms/formDefinitions"

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
}

export default function ContactDialog({ label = "Contact", className = "", variant = "link" }) {
  const dialogId = useId()
  const panelTitleId = `${dialogId}-title`
  const formId = `${dialogId}-form`
  const fullNameErrorId = `${dialogId}-full-name-error`
  const phoneErrorId = `${dialogId}-phone-error`
  const emailErrorId = `${dialogId}-email-error`
  const interestErrorId = `${dialogId}-interest-error`
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const {
    fieldErrors,
    isSubmitting,
    isSuccess,
    message,
    resetStatus,
    submit,
  } = useFormSubmission()

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value

    setValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }))
    resetStatus()
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const uaeMobilePattern = /^(05\d{8}|9715\d{8})$/

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Full name is required."
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Phone number is required."
    } else if (!uaeMobilePattern.test(values.phone)) {
      nextErrors.phone = "Enter a valid UAE number, like 05XXXXXXXX or 9715XXXXXXXX."
    }

    if (!values.interest) {
      nextErrors.interest = "Please select an option."
    }

    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateForm()) return

    const result = await submit("contact-dialog", event.currentTarget)

    if (result.success) {
      setValues(initialValues)
      setErrors({})
      return
    }

    setErrors(result.fieldErrors ?? {})
  }

  const triggerClasses =
    variant === "button"
      ? "inline-flex min-h-12 items-center justify-center rounded-full bg-[#313e85] px-6 text-sm font-semibold text-white transition hover:bg-[#25218d] focus:outline-none focus:ring-2 focus:ring-[#25218d] focus:ring-offset-2"
      : "inline-flex items-center text-sm font-bold text-current transition hover:text-[#25218d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25218d] focus-visible:ring-offset-4"

  const fieldClasses =
    "h-12 w-full rounded-[14px] border border-slate-200 bg-white px-5 text-sm text-slate-900 shadow-[inset_0_1px_0_rgb(255_255_255_/_90%),0_8px_22px_rgb(15_23_42_/_5%)] outline-none transition placeholder:text-slate-400 focus:border-[#25218d] focus:ring-4 focus:ring-[#25218d]/10"

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          resetStatus()
          setOpen(true)
        }}
        className={`${triggerClasses} ${className}`}
      >
        {label}
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[1200] bg-[#050b1f]/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <section
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        aria-labelledby={panelTitleId}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 z-[1210] mx-auto w-full max-w-[96rem] transform px-3 pb-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 md:bottom-5 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="relative max-h-[88vh] overflow-y-auto rounded-t-[32px] bg-white px-6 py-7 shadow-[0_-28px_80px_rgb(15_23_42_/_24%)] sm:rounded-[34px] sm:px-8 md:px-10 md:py-9">
          <button
            type="button"
            aria-label="Close contact panel"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_10px_25px_rgb(15_23_42_/_10%)] transition hover:bg-slate-50 hover:text-[#111744] focus:outline-none focus:ring-2 focus:ring-[#25218d] focus:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid gap-8 md:grid-cols-[minmax(220px,0.75fr)_minmax(0,2fr)_112px] md:items-center md:gap-10">
            <div className="pr-10 md:border-r md:border-slate-200 md:pr-8 lg:pr-12">
              <h2 id={panelTitleId} className="max-w-xs text-4xl font-medium leading-[1.08] tracking-normal text-[#25218d] sm:text-5xl md:text-[2.75rem]">
                We&apos;re here to help you
              </h2>
              <p className="mt-6 max-w-sm text-base leading-7 text-slate-600">
                Have a question or want to learn more about Apex Vision Model School? We&apos;d love to hear from you.
              </p>
            </div>

            <form
              id={formId}
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              className="grid gap-4 grid-cols-1 md:grid-cols-3 items-start"
            >
              <HoneypotField />

              <label className="grid text-sm font-bold text-slate-800 gap-2">
                Full Name <span className="sr-only">required</span>
                <input
                  required
                  name="fullName"
                  maxLength={100}
                  value={values.fullName}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? fullNameErrorId : undefined}
                  placeholder="Enter your full name"
                  className={fieldClasses}
                />
                {errors.fullName ? (
                  <span id={fullNameErrorId} className="text-xs font-semibold text-red-600">
                    {errors.fullName}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-800 ">
                Phone Number <span className="sr-only">required</span>
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={12}
                  value={values.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? phoneErrorId : undefined}
                  placeholder="Enter your phone number"
                  className={fieldClasses}
                />
                {errors.phone ? (
                  <span id={phoneErrorId} className="text-xs font-semibold text-red-600">
                    {errors.phone}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-800 ">
                Email Address (Optional)
                <input
                  name="email"
                  type="email"
                  maxLength={254}
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email || fieldErrors.email)}
                  aria-describedby={errors.email || fieldErrors.email ? emailErrorId : undefined}
                  placeholder="Enter your email address"
                  className={fieldClasses}
                />
                {errors.email || fieldErrors.email ? (
                  <span id={emailErrorId} className="text-xs font-semibold text-red-600">
                    {errors.email || fieldErrors.email}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-800">
                I&apos;m interested in <span className="sr-only">required</span>
                <select
                  required
                  name="interest"
                  value={values.interest}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={errors.interest ? interestErrorId : undefined}
                  className={`${fieldClasses} appearance-none text-slate-500`}
                >
                  <option value="">Select an option</option>
                  {FORM_OPTIONS.contactInterest.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.interest ? (
                  <span id={interestErrorId} className="text-xs font-semibold text-red-600">
                    {errors.interest}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-800 md:col-span-2">
                Message (Optional)
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows={3}
                  maxLength={2000}
                  className={`${fieldClasses} min-h-24 resize-none py-4`}
                />
              </label>

              {message ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-2xl px-5 py-4 text-sm font-semibold md:col-span-3 ${
                    isSuccess
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-4 rounded-full bg-[#25218d] px-5 py-4 text-sm font-bold text-white shadow-[0_18px_34px_rgb(37_33_141_/_28%)] transition hover:-translate-y-0.5 hover:bg-[#111744] focus:outline-none focus:ring-2 focus:ring-[#25218d] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65 md:hidden"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-white/12">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <path d="M20.5 3.5 10 14M20.5 3.5 15 21l-5-7-7-5 17.5-5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </span>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              className="hidden flex-col items-center justify-center gap-4 text-center text-sm font-bold text-[#25218d] transition hover:-translate-y-0.5 hover:text-[#111744] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25218d] focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-65 md:flex"
            >
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-[#25218d] text-white shadow-[0_18px_34px_rgb(37_33_141_/_32%)]">
                <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden="true">
                  <path d="M20.5 3.5 10 14M20.5 3.5 15 21l-5-7-7-5 17.5-5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </span>
              <span className="leading-tight">
                {isSubmitting ? "Sending" : "Send"}
                <br />
                Message
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
