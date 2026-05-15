export default function SchoolFront() {
  return (
    <section
      id="school-front"
      className="relative h-screen overflow-hidden bg-cover bg-center px-4 pt-24 md:px-10"

    >
      <div className="max-w-2xl rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(51,64,134,0.16)] backdrop-blur-lg flex flex-col items-start gap-4 w-fit ">
        <h2 className="font-accent text-heading uppercase font-semibold leading-[0.95] tracking-[-0.04em] text-black">
          NOT JUST A SCHOOL BUILDING.
        </h2>

        <p className=" max-w-[380px] font-semibold leading-tight text-black">
          A space designed to help every child learn, grow, express, and discover their potential. This is..
        </p>

        {/* <a href="#features" className=" rounded-full bg-[#364486] px-6 py-3 text-white! hover:bg-gray-800">
          Walkthrough journey
        </a> */}
      </div>
    </section>
  )
}
