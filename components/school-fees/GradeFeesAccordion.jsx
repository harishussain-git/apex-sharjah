"use client"

import { useState } from "react"
import { PiCaretDownBold } from "react-icons/pi"

function GradeFeeValue({ label, value, emphasized = false }) {
  return (
    <div className="min-w-0 rounded-xl bg-white/75 px-3 py-2 md:bg-transparent md:p-0 md:text-center">
      <span className="block text-xs font-medium leading-4 text-[#61708b] md:hidden">
        {label}
      </span>
      <span
        className={`mt-1 block text-sm leading-5 md:mt-0 md:text-base ${emphasized ? "font-bold text-[#081947]" : "font-medium text-[#42547a]"}`}
      >
        {value}
      </span>
    </div>
  )
}

function AdditionalFees({ grade, tuition }) {
  return (
    <div
      id={`${grade.id}-fee-details`}
      role="region"
      aria-labelledby={`${grade.id}-fee-trigger`}
      className="border-t border-[#d9e0e9] bg-white p-4 sm:p-5"
    >
      <h3 className="text-sm font-bold text-[#081947] sm:text-base">
        {tuition.additionalFeesTitle} — {grade.label}
      </h3>

      <div className="mt-3 flex min-h-12 items-center justify-between gap-4 rounded-xl bg-[#f2f5f9] px-4 py-3 text-sm">
        <span className="font-semibold text-[#081947]">
          {tuition.admissionFeeLabel}
        </span>
        <span className="shrink-0 font-bold text-[#081947]">
          {tuition.admissionFee}
        </span>
      </div>

      <div className="mt-3 hidden overflow-hidden rounded-xl border border-[#e2e7ef] md:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-[#f2f5f9] text-[#52617b]">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                {tuition.itemLabel}
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                {tuition.additionalApprovedLabel}
              </th>
              <th scope="col" className="px-4 py-3 text-center font-medium">
                {tuition.additionalDiscountedLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {tuition.additionalItems.map((item, index) => (
              <tr
                key={item.id}
                className={index > 0 ? "border-t border-[#e2e7ef]" : undefined}
              >
                <th scope="row" className="px-4 py-3 font-semibold text-[#081947]">
                  {item.label}
                </th>
                <td className="px-4 py-3 text-center text-[#42547a]">
                  {item.approved}
                </td>
                <td className="px-4 py-3 text-center font-bold text-[#081947]">
                  {item.discounted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-3 space-y-3 md:hidden">
        {tuition.additionalItems.map((item) => (
          <div key={item.id} className="rounded-xl border border-[#e2e7ef] p-4">
            <dt className="font-bold text-[#081947]">{item.label}</dt>
            <dd className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs leading-4 text-[#61708b]">
                  {tuition.additionalApprovedLabel}
                </span>
                <span className="mt-1 block font-medium text-[#42547a]">
                  {item.approved}
                </span>
              </div>
              <div>
                <span className="block text-xs leading-4 text-[#61708b]">
                  {tuition.additionalDiscountedLabel}
                </span>
                <span className="mt-1 block font-bold text-[#081947]">
                  {item.discounted}
                </span>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function GradeFeesAccordion({ tuition }) {
  const [openGradeId, setOpenGradeId] = useState(tuition.grades[0]?.id ?? null)

  return (
    <div>
      <div className="hidden grid-cols-[1.05fr_1fr_1fr_2.75rem] gap-5 px-5 pb-3 text-sm font-semibold leading-5 text-[#42547a] md:grid">
        <span>{tuition.gradeLabel}</span>
        <span className="text-center">{tuition.approvedLabel}</span>
        <span className="text-center">{tuition.discountedLabel}</span>
        <span aria-hidden="true" />
      </div>

      <div className="space-y-2 md:space-y-0 md:overflow-hidden md:rounded-2xl">
        {tuition.grades.map((grade, index) => {
          const expanded = grade.id === openGradeId

          return (
            <div
              key={grade.id}
              className={`overflow-hidden rounded-2xl bg-[#f2f5f9] md:rounded-none ${index > 0 ? "md:border-t md:border-[#d9e0e9]" : ""}`}
            >
              <button
                id={`${grade.id}-fee-trigger`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`${grade.id}-fee-details`}
                onClick={() => setOpenGradeId(expanded ? null : grade.id)}
                className="grid min-h-14 w-full cursor-pointer grid-cols-[minmax(0,1fr)_2.75rem] items-start gap-3 rounded-2xl p-4 text-left transition hover:bg-[#e9eef5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#334086] md:grid-cols-[minmax(0,1fr)_2.75rem] md:items-center md:rounded-none md:px-5 md:py-4"
              >
                <span className="min-w-0 md:grid md:grid-cols-[1.05fr_1fr_1fr] md:items-center md:gap-5">
                  <span className="block text-base font-bold text-[#081947]">
                    {grade.label}
                  </span>
                  <span className="mt-3 grid grid-cols-2 gap-3 md:contents">
                    <GradeFeeValue
                      label={tuition.approvedLabel}
                      value={grade.approved}
                    />
                    <GradeFeeValue
                      label={tuition.discountedLabel}
                      value={grade.discounted}
                      emphasized
                    />
                  </span>
                </span>

                <span className="flex size-11 items-center justify-center rounded-full text-[#081947]" aria-hidden="true">
                  <PiCaretDownBold
                    className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {expanded ? <AdditionalFees grade={grade} tuition={tuition} /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
