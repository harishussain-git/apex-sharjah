import React from 'react'

const PreLoader = ({ progress = 50 }) => {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-white">
      <div className="h-[100px] w-fit md:h-[160px] relative ">

        <div className="h-full w-full">
          <img className="block h-full w-auto max-w-none opacity-10" src="/home/apex-logo-big.webp" alt="Apex Vision Model School" />
        </div>

        <div className="h-full overflow-hidden absolute z-10 top-0 left-0 motion-safe:transition-[width] motion-safe:duration-150 motion-safe:ease-out" style={{ width: `${progress}%` }} aria-hidden="true">
          <img className="block h-full w-auto max-w-none" src="/home/apex-logo-big.webp" alt="" />
        </div>

      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2  font-semibold tabular-nums text-primary">Loading {progress}%</p>
    </div>
  )
}

export default PreLoader
