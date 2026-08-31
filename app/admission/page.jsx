"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import HoneypotField from "@/components/forms/HoneypotField"
import useFormSubmission from "@/hooks/useFormSubmission"
import { FORM_OPTIONS } from "@/lib/forms/formDefinitions"
import {
  PiClock,
  PiEnvelopeSimple,
  PiGraduationCap,
  PiMapPin,
  PiNavigationArrow,
  PiPhone,
  PiShieldCheck,
} from "react-icons/pi"

const formSections = [
  {
    title: "Parent / Guardian Details",
    fields: [
      { name: "guardianName", label: "Parent / Guardian Name", type: "text", placeholder: "Enter full name" },
      { name: "relationship", label: "Relationship with Child", type: "select", placeholder: "Select relationship", options: FORM_OPTIONS.relationship },
      { name: "email", label: "Contact Email", type: "email", placeholder: "Enter email address" },
      { name: "phone", label: "Contact Number", type: "tel", placeholder: "Enter mobile number" },
    ],
  },
  {
    title: "Student Details",
    fields: [
      { name: "studentName", label: "Student Name", type: "text", placeholder: "Enter student full name" },
      { name: "gender", label: "Gender", type: "select", placeholder: "Select gender", options: FORM_OPTIONS.gender },
      { name: "dob", label: "Date of Birth", type: "date", placeholder: "DD / MM / YYYY" },
      { name: "age", label: "Age (auto-filled)", type: "text", placeholder: "-", readOnly: true },
      { name: "academicYear", label: "Academic Year", type: "select", placeholder: "Select academic year", options: FORM_OPTIONS.academicYear },
      { name: "grade", label: "Admission to Grade", type: "select", placeholder: "Select grade", options: FORM_OPTIONS.grade },
      { name: "nationality", label: "Nationality", type: "select", placeholder: "Select nationality", options: FORM_OPTIONS.nationality },
      { name: "emirate", label: "Emirate of Residence", type: "select", placeholder: "Select emirate", options: FORM_OPTIONS.emirate },
      { name: "area", label: "Area of Residence", type: "text", placeholder: "Enter area" },
      { name: "transport", label: "Transportation Required", type: "select", placeholder: "Select option", options: FORM_OPTIONS.transport },
    ],
  },
]

const initialValues = Object.fromEntries(
  formSections.flatMap((section) => section.fields.map((field) => [field.name, ""])),
)

const requiredFields = formSections.flatMap((section) =>
  section.fields.filter((field) => !field.readOnly).map((field) => field.name),
)

const fieldMaxLengths = {
  guardianName: 100,
  email: 254,
  phone: 20,
  studentName: 100,
  area: 120,
}

const contactItems = [
  {
    icon: PiMapPin,
    text: "Plot # 2028/A, Street 129, Al Sabkha, Al Riqa Suburb, Sharjah, UAE",
  },
  { icon: PiEnvelopeSimple, text: "contact@apexsharjah.com" },
  { icon: PiPhone, text: "+971 50 459 8701" },
]

const trustItems = [
  { icon: PiGraduationCap, text: "KG1 to Grade 4" },
  { icon: PiClock, text: "Response within 24 hours" }
]

function getAge(dob) {
  if (!dob) return ""

  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return Number.isFinite(age) && age >= 0 ? String(age) : ""
}

export default function AdmissionPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const { isSubmitting, isSuccess, message, resetStatus, submit } =
    useFormSubmission()

  const numberedSections = useMemo(() => {
    let count = 0

    return formSections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({ ...field, number: ++count })),
    }))
  }, [])

  const updateValue = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
      ...(name === "dob" ? { age: getAge(value) } : {}),
    }))
    setErrors((current) => ({ ...current, [name]: "" }))
    resetStatus()
  }

  const validate = () => {
    const nextErrors = {}

    requiredFields.forEach((name) => {
      if (!values[name]?.trim()) nextErrors[name] = "Required"
    })

    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email"
    }

    if (values.phone && !/^(05\d{8}|5\d{8}|\+9715\d{8}|9715\d{8})$/.test(values.phone.replace(/\s/g, ""))) {
      nextErrors.phone = "Enter a valid UAE mobile number"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    const result = await submit("admission", event.currentTarget)

    if (!result.success) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        ...result.fieldErrors,
      }))
    }
  }

  const fieldClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0656d9] focus:ring-4 focus:ring-[#0656d9]/10"

  return (
    <main className="min-h-screen bg-[#f6f9ff] px-4 py-6 text-[#17234d] md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[360px_1fr] mt-12 md:mt-0">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(23,35,77,0.08)] lg:sticky lg:top-6 lg:self-start">

          <h1 className="font-accent uppercase  text-4xl font-semibold tracking-tight text-[#13245a]">Book Admission</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Share a few details and our admissions team will get in touch with you.
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fbff] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="relative h-44 overflow-hidden bg-[linear-gradient(135deg,#eef4ff_0%,#f9fbff_100%)]">
              <div className="absolute inset-0 opacity-75 [background-image:linear-gradient(35deg,transparent_45%,#dbe5f4_46%,#dbe5f4_50%,transparent_51%),linear-gradient(125deg,transparent_45%,#dbe5f4_46%,#dbe5f4_50%,transparent_51%)] [background-size:58px_58px]" />
              <div className="absolute left-[48%] top-[39%] flex items-center gap-2 text-sm font-black leading-tight text-[#0656d9]">
                <span className="grid size-10 place-items-center rounded-full bg-[#0656d9] text-white shadow-lg">
                  <PiMapPin className="text-2xl" weight="fill" />
                </span>
                Apex Vision<br />Model School
              </div>
              <button
                type="button"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg border border-[#0656d9]/35 bg-white px-3 py-2 text-xs font-bold text-[#0656d9] shadow-sm"
              >
                <PiNavigationArrow className="text-base" weight="fill" />
                Get Directions
              </button>
            </div>

            <div className="space-y-4 p-5">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4 text-sm leading-6 text-slate-600">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0656d9] shadow-sm">
                    <Icon className="text-xl" />
                  </span>
                  <span>{text}</span>
                </div>
              ))}

              <div className="h-px bg-slate-200" />

              {trustItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 text-sm font-medium text-slate-600">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#0656d9] shadow-sm">
                    <Icon className="text-xl" />
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_70px_rgba(23,35,77,0.08)] md:p-8">
          <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <HoneypotField />
            {numberedSections.map((section) => (
              <div key={section.title} className="mb-8">
                <div className="mb-5 flex items-center gap-4">
                  <h2 className="shrink-0 text-base font-black uppercase text-[#0656d9]">{section.title}</h2>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 block text-sm font-bold text-[#17234d]">
                        {field.number}. {field.label}
                        {!field.readOnly ? <span className="text-red-500"> *</span> : null}
                      </span>

                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          required={!field.readOnly}
                          value={values[field.name]}
                          onChange={(event) => updateValue(field.name, event.target.value)}
                          className={`${fieldClass} appearance-none`}
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={field.name}
                          type={field.type}
                          required={!field.readOnly}
                          maxLength={fieldMaxLengths[field.name]}
                          autoComplete={
                            field.name === "email"
                              ? "email"
                              : field.name === "phone"
                                ? "tel"
                                : undefined
                          }
                          value={values[field.name]}
                          readOnly={field.readOnly}
                          placeholder={field.placeholder}
                          onChange={(event) => updateValue(field.name, event.target.value)}
                          className={`${fieldClass} ${field.readOnly ? "bg-slate-50 text-slate-500" : ""}`}
                        />
                      )}

                      {errors[field.name] ? (
                        <span className="mt-1 block text-xs font-semibold text-red-600">{errors[field.name]}</span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-13 w-full items-center justify-center rounded-xl bg-[#0656d9] px-6 text-base font-bold text-white shadow-[0_14px_34px_rgba(6,86,217,0.26)] transition hover:bg-[#0148bd] focus:outline-none focus:ring-4 focus:ring-[#0656d9]/20 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isSubmitting ? "Sending..." : "Book Admission"}
            </button>

            {message ? (
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 rounded-xl px-4 py-3 text-center text-sm font-bold ${
                  isSuccess
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            ) : null}

            <p className="mt-4 text-center text-sm text-slate-500">
              Your information will be used only for admission enquiries.
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}
