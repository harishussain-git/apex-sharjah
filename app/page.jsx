"use client";

// import useSectionSnap from "@/lib/gsap/useSectionSnap";

import Hero from "../components/home/Hero1";
import Features from "../components/home/Features";
import MoreDetails from "../components/home/MoreDetails";
import Footer from "../components/home/Footer";
import TextSection from "../components/home/TextSection";
import SchoolFront from "../components/home/SchoolFront";

export default function Page() {
  // useSectionSnap([
  //   "school-front",
  //   "features",
  //   "more-details",
  // ]);

  return (
    <>
      <div className="bg-gray-900  flex flex-col gap-4 justify-center items-center min-h-screen">
        <p className="text-white">Site under construction</p>
        <a href="/demo1" className="bg-white/80 px-4 py-2 text-black font-semibold rounded-full hover:bg-white hover:text-black">Demo 1</a>
      </div>


      {/* <Hero />
      <TextSection />
      <SchoolFront />
      <Features />
      <MoreDetails />
      <Footer /> */}
    </>
  );
}