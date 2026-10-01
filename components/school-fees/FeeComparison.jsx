function FeeValue({ label, value, emphasized = false }) {
  return (
    <dd className="min-w-0">
      <span className="block text-xs font-medium leading-4 text-[#61708b] md:hidden">
        {label}
      </span>
      <span
        className={`mt-1 block text-sm leading-5 md:mt-0 md:text-base ${emphasized ? "font-bold text-[#081947]" : "font-medium text-[#42547a]"}`}
      >
        {value}
      </span>
    </dd>
  )
}

export default function FeeComparison({
  firstColumnLabel,
  approvedLabel,
  discountedLabel,
  rows,
}) {
  return (
    <div className="overflow-hidden rounded-[22px] bg-[#f2f5f9] p-3 sm:p-4">
      <div className="hidden grid-cols-[1.05fr_1fr_1fr] gap-5 px-4 pb-3 text-sm font-semibold leading-5 text-[#42547a] md:grid">
        <span>{firstColumnLabel}</span>
        <span className="text-center">{approvedLabel}</span>
        <span className="text-center">{discountedLabel}</span>
      </div>

      <dl className="space-y-2 md:space-y-0 md:overflow-hidden md:rounded-2xl md:bg-white">
        {rows.map((row, index) => (
          <div
            key={row.id}
            className={`rounded-2xl bg-white p-4 md:grid md:grid-cols-[1.05fr_1fr_1fr] md:items-center md:gap-5 md:rounded-none md:px-4 md:py-3 ${index > 0 ? "md:border-t md:border-[#d9e0e9]" : ""}`}
          >
            <dt className="font-bold text-[#081947]">{row.label}</dt>
            <div className="mt-3 grid grid-cols-2 gap-4 md:contents">
              <FeeValue label={approvedLabel} value={row.approved} />
              <FeeValue
                label={discountedLabel}
                value={row.discounted}
                emphasized
              />
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
