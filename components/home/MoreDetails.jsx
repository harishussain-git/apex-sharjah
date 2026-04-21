const items = [
  {
    title: "One sequence folder",
    text: "A single ordered frame set is easier to preload, maintain, and retime than multiple fragmented folders.",
  },
  {
    title: "One anchor array",
    text: "Adding a new stop is just one new object with an id, frame, title, and description.",
  },
  {
    title: "One pinned section",
    text: "The scroll story stays focused and the rest of the homepage remains simple normal-flow content.",
  },
]

export default function MoreDetails() {
  return (
    <section id="details" className="bg-neutral-100 px-6 py-24 text-neutral-950 md:px-10">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
            Why this version works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            The first version stays flexible by refusing extra architecture.
          </h2>
          <p className="text-base leading-7 text-neutral-600">
            You get a readable base that handles pinning, snapping, active overlays, and canvas
            rendering without spreading the logic across a pile of files.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
