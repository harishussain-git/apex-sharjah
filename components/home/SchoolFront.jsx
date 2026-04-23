export default function SchoolFront() {
  return (
    <section
      id="school-front"
      className="relative h-screen overflow-hidden bg-cover bg-center px-4 pt-24 md:px-10"
      
    >
      <div className="max-w-2xl rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(51,64,134,0.16)] backdrop-blur-lg  ">
        <h2 className="font-accent text-heading uppercase font-semibold leading-[0.95] tracking-[-0.04em] text-black">
          This is more than a school building.
        </h2>

        <p className="mt-8 max-w-4xl font-semibold leading-tight text-black">
          From the moment a child steps in, every space is designed with purpose.
          Classrooms, labs, play areas, and quiet corners - each one shaping how
          they think, move, and grow.
        </p>

        <button className="mt-8 rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800">
          Walkthrough journey
        </button>
      </div>
    </section>
  )
}
