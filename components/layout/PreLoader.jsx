import React from 'react'

const PreLoader = () => {
  return (
    <div className=" flex items-center justify-center h-screen w-screen bg-white">
      <div className="h-[100px] w-fit md:h-[200px] bg-green-500 relative">

        <div className="h-full w-full">
          <img className="h-full w-full relative top-0 left-0  object-cover" src="/home/apex-logo-big.webp" alt="Apex Vision Model School" />
        </div>

        <div className="h-[50%] w-full bg-red-500 absolute z-10 top-0 left-0 ">
          <img className="h-full w-full relative top-0 left-0 object-cover" src="/home/apex-logo-big.webp" alt="Apex Vision Model School" />
        </div>

        {/* <div className="bg-red-400 absolute z-10"><img className="" src="/home/apex-logo-big.webp" alt="Apex Vision Model School" /></div>

        <div className="bg-gray-400 absolute z-20 overflow-hidden"><img className="h-full w-full object-contain " src="/home/apex-logo-big.webp" alt="Apex Vision Model School" /></div> */}

      </div>

    </div>
  )
}

export default PreLoader