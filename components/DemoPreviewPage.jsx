export default function DemoPreviewPage() {
  return (
    <section className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-7xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Choose a Demo Preview
          </h1>
          <p className="mt-4 text-base text-gray-500 md:text-lg">
            View the completed demo or check back soon for the next version.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <a
            href="/demo1"
            className="block rounded-[28px] border border-gray-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
          >
            <img
              src="/img/demo1.webp"
              alt="Demo 1 preview"
              className="h-64 w-full rounded-[22px] bg-gray-100 object-cover md:h-72"
            />

            <div className="p-4">
              <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 my-3 text-sm font-medium text-green-700">
                Completed
              </span>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Demo 1
                </h2>
                <p className="text-sm font-medium text-blue-600">
                  Click to view →
                </p>
              </div>
            </div>
          </a>

          <a
            href="/"
            className="rounded-[28px] border border-gray-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          >
            <img
              src="/img/demo2-thumbnail.webp"
              alt="Demo 2 preview"
              className="h-64 w-full rounded-[22px] bg-gray-100 object-cover md:h-72"
            />

            <div className="p-4">
              <span className="inline-flex rounded-full border   border-amber-200 bg-amber-50 my-3 px-3 py-1 text-sm font-medium text-amber-600">
                In Progress
              </span>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Demo 2
              </h2>
              <p className="text-sm font-medium text-gray-400">
                Click to view →
              </p>
              </div>

            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
