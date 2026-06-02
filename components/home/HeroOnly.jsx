import React from 'react'

const HeroOnly = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <video autoPlay muted className="w-full h-full object-cover">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default HeroOnly